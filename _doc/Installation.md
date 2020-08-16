---
layout: doc
title: Installation
permalink: /doc/Installation/
---

# Installation and removal 

## VSPackage (VSIX)

About [.vsix](https://msdn.microsoft.com/en-us/library/ff407026.aspx)

**To install:**

* Get latest build [{{site.lnkCur_VSPackage[1]}}]({{site.lnkCur_VSPackage[2]}}), click it, then restart VS IDE. That's all.

Manually:

```{{site.msblang}}
VSIXInstaller.exe <downloaded_file>
```

**To remove:**

`VS IDE` - `Tools` - `Extension and Updates ...`: `Uninstall` or `Disable`

Manually:

```{{site.msblang}}
VSIXInstaller.exe /uninstall:94ecd13f-15f3-4f51-9afd-17f0275c6266
```

## CI.MSBuild

UsUse the documentation from [here](../CI/CI.MSBuild/)

## Devenv Command-Line

Use the documentation from [here](../CI/Devenv Command-Line/)