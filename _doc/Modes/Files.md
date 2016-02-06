---
layout: doc
title: Files Mode
permalink: /doc/Modes/Files/
---

# Files Mode

This is very simple action type for executing any external files 'as is'.

After selecting of this mode you should write file name or list of file names (separated by enter key) with arguments if needed.

**Note:**

* The solution directory is used by default for all your relative paths or simple file names.
* You can also enable [MSBuild](../../Scripts/MSBuild/) & [SBE-Scripts](../../Scripts/SBE-Scripts/) engines for customizing of this list in details.

Sample:

```{{site.msblang}}
rev.exe -b 1024
c:\tmp\build.bat
$(SolutionDir)\clean.bat
```

## Options

{% include elem/fillme %}

### Time limit

`How long to wait the exection, in seconds. 0 value - infinitely`

This option should terminate execution of this action for selected time.

# References

* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)