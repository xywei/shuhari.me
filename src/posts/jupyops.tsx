import type { PostMeta } from '@/lib/posts'

export const meta = {
  slug: 'jupyops',
  title: 'JupyOps',
  date: '2024-02-27',
  description: 'Tips and tricks using JupyterLab/Notebook.',
  tags: ['jupyter', 'tips'],
} satisfies PostMeta

export default function JupyOpsPost() {
  return (
    <>
      <h2>Install <code>jupyter</code> with <code>pipx</code></h2>
      <p>First, issues with other methods I have tried:</p>
      <ul>
        <li>
          Using the system package manager: some extensions may not be actively maintained, for
          example <a href="https://aur.archlinux.org/packages/python-jupyterlab-vim">python-jupyterlab-vim</a>.
        </li>
        <li>
          Using a project virtual environment or conda environment: the setup has to be duplicated
          in each environment.
        </li>
      </ul>

      <p>
        What I settled on for now is using <code>pipx</code> to manage a separate virtual
        environment for everything Jupyter. Here is how I do it.
      </p>

      <p>Install the metapackage that pulls in all Jupyter components:</p>
      <pre><code>{`pipx install jupyter --include-deps
pipx ensurepath`}</code></pre>

      <p>Inject other useful packages into the <code>jupyter</code> environment:</p>
      <pre><code>{`pipx inject jupyter ipywidgets
pipx inject jupyter jupyterlab_widgets
pipx inject jupyter jupyterlab-vim
pipx inject jupyter jupyterlab-git
pipx inject jupyter jupyterlab-lsp 'python-lsp-server[all]'
pipx inject jupyter jupyterlab-code-formatter black`}</code></pre>

      <p>To keep the packages updated, run:</p>
      <pre><code>{`pipx upgrade-all`}</code></pre>

      <p>If the system Python is updated, you may also need to reinstall packages under <code>pipx</code>:</p>
      <pre><code>{`pipx reinstall-all`}</code></pre>

      <h2>Manage kernel registry</h2>
      <p>
        By default, JupyterLab only has access to the <code>ipython</code> kernel from the
        same virtual environment. To add another kernel, run the following command using the{' '}
        <code>ipython</code> you would like to register:
      </p>
      <pre><code>{`<your kernel path>/ipython kernel install --user --name=<your kernel name>`}</code></pre>

      <p>
        For example, this adds the system <code>ipython</code> kernel to the kernel selection
        list in the Notebook/Lab UI.
      </p>
      <pre><code>{`/bin/ipython kernel install --user --name=system`}</code></pre>

      <p>
        To make <code>ipywidgets</code> work, it also needs to be installed in each kernel
        environment. For conda, for example:
      </p>
      <pre><code>{`conda install -c conda-forge ipykernel ipywidgets`}</code></pre>

      <p>To see a list of registered kernels:</p>
      <pre><code>{`jupyter kernelspec list`}</code></pre>

      <p>To remove a registered kernel from the list:</p>
      <pre><code>{`jupyter kernelspec uninstall <unwanted kernel>`}</code></pre>
      <p>
        <code>uninstall</code> and <code>remove</code> are equivalent here.
      </p>

      <h2>Avoid Git repository bloating</h2>
      <p>
        When notebooks are added to a Git repository, their output can be filtered out to avoid
        bloating the repository.
      </p>
      <ol>
        <li>
          Add a filter to the repo-wise Git config. Use <code>--global</code> to make it global.
          We only need to define the <code>clean</code> command, which is used to convert the
          contents of a worktree file upon check-in.
          <pre><code>{[
            'git config filter.strip-notebook-output.clean \\',
            "  'jupyter nbconvert --ClearOutputPreprocessor.enabled=True --to=notebook --stdin --stdout --log-level=ERROR'",
          ].join('\n')}</code></pre>
        </li>
        <li>
          Tell Git to apply this filter to <code>.ipynb</code> files.
          <pre><code>{`echo '*.ipynb filter=strip-notebook-output' >> .git/info/attributes`}</code></pre>
        </li>
        <li>
          If the repo has existing unscrubbed notebooks, add them to be renormalized and then commit.
          <pre><code>{`git add --renormalize .`}</code></pre>
        </li>
      </ol>

      <p>
        Note that the filter only cleans checked-in notebooks. The local worktree remains untouched.
      </p>
    </>
  )
}
