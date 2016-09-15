---
layout: doc
title: Installation
permalink: /doc/Installation/
---

# Installation and removal 

## VSPackage

[The main plugin](../Scheme/). Contains logic for work with events of Visual Studio and core of different actions for anything.

**To install:**

 * Get latest build [{{site.lnkCur_VSPackage[1]}}]({{site.lnkCur_VSPackage[2]}}) and restart VS IDE. That's all.

If you received file with different extension: simply change on [.vsix](https://msdn.microsoft.com/en-us/library/ff407026.aspx) or install manually with command:

```{{site.msblang}}
VSIXInstaller.exe <downloaded_file>
```
Note: Other problems with getting plugin ([Error 500](https://twitter.com/sfnet_ops) etc.) try to ask [here](http://sourceforge.net/support) (our hosting provider)

**To remove:**

`VS IDE` - `Tools` - `Extension and Updates ...`: `Uninstall` or `Disable`

If you need manually:

```{{site.msblang}}
VSIXInstaller.exe /uninstall:94ecd13f-15f3-4f51-9afd-17f0275c6266
```

## CI.MSBuild

Use documentation from [here](../CI/CI.MSBuild/)

## Devenv Command-Line

Use documentation from [here](../CI/Devenv Command-Line/)