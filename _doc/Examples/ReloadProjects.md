---
layout: doc
title: Reload projects in solution
permalink: /doc/Examples/ReloadProjects/
---
## Reload projects in solution

In some cases you may need automatically reload your projects in solution. 

For example, you have added git submodules for your projects, and you want to update/get it automatically after cloning of your repo when .sln is opened in first time.

{% assign infoData  = "Starting with v0.12.8 you have also the [Contexts for Sln-Opened event](../../Events/SlnOpened/#context)." %}
{% include elem/info %}

{% assign infoColor = "#5C9ECF" %}
{% assign infoData  = "Modern way to [Restore all git submodules when opening Visual Studio IDE](../../Examples/Git/Submodules/#restore-all-git-submodules-when-opening-visual-studio-ide)" %}
{% include elem/info %}

### How to

* Select event type, for example the [`Sln-Opened`](../../Events/SlnOpened/#context) to reload projects when you open Visual Studio with your Solution.
* Then, add [action](../../Modes/) with [C# Mode](../../Modes/CSharp/)
* Now you can write code, for example:

[https://gist.github.com/3F/a7f8eeb59ade9139d4da4862e03ee225](https://gist.github.com/3F/a7f8eeb59ade9139d4da4862e03ee225)

```csharp
using System;
using Microsoft.VisualStudio;
using Microsoft.VisualStudio.Shell.Interop;
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            // TODO: optional something before reload projects ...

            object service      = Microsoft.VisualStudio.Shell.Package.GetGlobalService(typeof(IVsSolution));
            IVsSolution sln     = (IVsSolution)service;
            IVsSolution4 sln4   = (IVsSolution4)service;

            IEnumHierarchies projects;
            Guid gtype = Guid.Empty;
            if(ErrorHandler.Failed(sln.GetProjectEnum((int)__VSENUMPROJFLAGS.EPF_UNLOADEDINSOLUTION  /*EPF_ALLPROJECTS*/, ref gtype, out projects))) {
                return 0;
            }

            var phr = new IVsHierarchy[1];
            uint count;
            while((projects.Next((uint)phr.Length, phr, out count) == VSConstants.S_OK) && (count > 0))
            {
                Guid pGuid;
                if(ErrorHandler.Failed(sln.GetGuidOfProject(phr[0], out pGuid))) {
                    continue;
                }
                sln4.EnsureProjectIsLoaded(ref pGuid, (uint)__VSBSLFLAGS.VSBSLFLAGS_None);
            }
            
            return 0;
        }
    }
}
```
__VSENUMPROJFLAGS.`EPF_UNLOADEDINSOLUTION` for unloaded projects only and __VSENUMPROJFLAGS.`EPF_ALLPROJECTS` for all.

* In `Compiler` settings - `References` add the following assemblies:

```{{site.msblang}}
System
$(vsSBE_LibPath)Microsoft.VisualStudio.Shell.Interop.10.0.dll
$(vsSBE_LibPath)Microsoft.VisualStudio.Shell.Interop.dll
$(vsSBE_LibPath)Microsoft.VisualStudio.Shell.10.0.dll
$(vsSBE_LibPath)Microsoft.VisualStudio.Shell.Interop.9.0.dll
$(vsSBE_LibPath)Microsoft.VisualStudio.Shell.Interop.8.0.dll
$(vsSBE_LibPath)Microsoft.VisualStudio.OLE.Interop.dll
```

Done.

Activate action and Enjoy.

## References

* [MSBuild](../../Scripts/MSBuild/)
* [C# Mode](../../Modes/CSharp/)
    * [Processing modes](../../Modes/)
* [Sln-Opened](../../Events/SlnOpened/#context)
    * [Events](../../Events/)
* [Examples & Features]({{site.docp}}/Examples/)