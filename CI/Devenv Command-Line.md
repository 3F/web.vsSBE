# vsSolutionBuildEvent Devenv Command-Line #

Utility to support the command-line mode of the Visual Studio for work with [vsSolutionBuildEvent](https://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/) through **[Devenv](https://msdn.microsoft.com/en-us/library/vstudio/xee0c8y7.aspx)**

**Please note**: you can use the **[CI.MSBuild](../CI/CI.MSBuild)** utility for work through msbuild.exe for special build server etc.

` *!* `
The [Add-ins are deprecated in Visual Studio 2013](http://msdn.microsoft.com/en-us/library/80493a3w.aspx) and removed in [14CTP](http://www.visualstudioextensibility.com/2014/06/05/visual-studio-14-ctp-add-ins-are-gone/) (also in VS2015 Preview)

Therefore, this utility support the next versions: Visual Studio 2010, 2012, 2013.

However! Command-Line mode not available for [VSPackages](https://msdn.microsoft.com/en-us/library/bb166424.aspx) and possible only with Add-in.

This reported on MS Connect Issue #[1075033](https://connect.microsoft.com/VisualStudio/Feedback/Details/1075033) you can vote this!

* As variant, you can use other our utility - **[CI.MSBuild](../CI/CI.MSBuild)**

` *!* `

## How to get & Install ##

* [Download Devenv_v1.0_[5d7aa0c].zip](http://sourceforge.net/projects/vssbe/files/CI-Utilities/Devenv/Devenv_v1.0_%5B5d7aa0c%5D.zip/download) (SourceForge.net) 
* * All binaries of the CI.MSBuild: [CI-Utilities/Devenv/](https://sourceforge.net/projects/vssbe/files/CI-Utilities/Devenv/)

Currently the Devenv Command-Line it's only additional wrapper (~41 kb) for work with vsSolutionBuildEvent plugin through [API](../API). It means, you should also have this library for work.

* Unpack the Devenv archive into the `%HOMEPATH%\Documents\` -> `Visual Studio <num>\Addins` folder. *(you can delete all *.pdb files from archive)*
* * For example: `C:\Users\<user>\Documents\Visual Studio 2013\Addins\`
* The [vsSolutionBuildEvent plugin](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/referral/118151) plugin already should be installed for your version of the Visual Studio.
* * **Or** [Download](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/referral/118151) and extract all files from *.**vsix** with any archiver ([it's a simple 'zip' archive](https://msdn.microsoft.com/en-us/library/ff407026.aspx)) into `%HOMEPATH%\Documents\Visual Studio 2013\Addins\Devenv\`

That's all. Now you can use the vsSolutionBuildEvent with msbuild. See below of how to use it.

## How to use ##

After install you can use the vsSolutionBuildEvent with [Devenv](https://msdn.microsoft.com/en-us/library/vstudio/xee0c8y7.aspx), for example:

```
#!bash

"C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv" "D:\tmp\App1\App1.sln" /Rebuild Debug
```

You can also use the `verbosity` key for details information from vsSolutionBuildEvent - `verbosity:diagnostic` (**debug mode**), for example:

```
#!bash

"C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv" "D:\tmp\App1\App1.sln" verbosity:diagnostic /Build Release
```

For more details about Devenv Command Line see [MSDN documentation](https://msdn.microsoft.com/en-us/library/vstudio/xee0c8y7.aspx)

![Example of work](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/Devenv_example.png)
