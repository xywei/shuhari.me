---
title: JupyOps
date: 2024/2/27
description: Tips and tricks using JupyterLab/Notebook
tag: jupyter, tips
author: 
---

## Install `jupyter` with `pipx`

First, issues with other methods I have tried:
- Using system's package manager: some extensions may not be actively maintained ([example](https://aur.archlinux.org/packages/python-jupyterlab-vim))
- Using project's venv or conda env: have to duplicate the setup in each environment

What I settled on for now is using `pipx` to manage a separate virtual environment for everything Jupyter. Here is how I do it:
- Install the metapackage that pulls in all Jupyter components
  ```
  pipx install jupyter --include-deps 
  pipx ensurepath
  ```
- Inject other useful things into the `jupyter` venv
  ```
  pipx inject jupyter ipywidgets
  pipx inject jupyter jupyterlab_widgets
  pipx inject jupyter jupyterlab-vim
  pipx inject jupyter jupyterlab-git
  pipx inject jupyter jupyterlab-lsp 'python-lsp-server[all]'
  pipx inject jupyter jupyterlab-code-formatter black
  ```

To keep the packages updated, run
```
pipx upgrade-all
```

If the system's Python is updated, you may also need to re-install packages under `pipx`
```
pipx reinstall-all
```

## Manage kernel registry

By default, JupyterLab only has access to the `ipython` kernel from the same virtual environment. To add another kernel, run the following command using the `ipython` you would like to register
```
<your kernel path>/ipython kernel install --user --name=<your kernel name>
```

For example, this adds the systems's `ipython` kernel to the kernel selection list in the Notebook/Lab UI.
```
/bin/ipython kernel install --user --name=system
```

To make `ipywidgets` work, it also needs to be installed in each kernel's environment, e.g., for `conda`,
```
conda install -c conda-forge ipykernel ipywidgets
```

To see a list of registered kernels
```
jupyter kernelspec list
```

To remove a registered kernel from the list, run
```
jupyter kernelspec uninstall <unwanted kernel>
```
(`uninstall` and `remove` are equivalent here).

## Avoid Git repository bloating

When added to a `git` repository, the notebooks' output can be filtered out to avoid bloating.
- Add a filter to repo-wise git config (use `--global` flag to make it global). We only need to define the `clean` command,
  which is used to convert the contents of worktree file upon checkin.
  ```
  git config filter.strip-notebook-output.clean \
    'jupyter nbconvert --ClearOutputPreprocessor.enabled=True --to=notebook --stdin --stdout --log-level=ERROR'
  ```
- Tell git to apply this filter to `.ipynb` files
  ```
  echo '*.ipynb filter=strip-notebook-output' >> .git/info/attributes
  ```
- If the repo has existing unscrubbed notebooks, add them to be renormalized
  ```
  git add --renormalize .
  ```
  and then commit.

Note that the filter only cleans the checked-in notebooks, the local worktree remains untouched.
