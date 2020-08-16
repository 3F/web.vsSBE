---
layout: doc
title: vsSolutionBuildEvent API
permalink: /doc/API/
---
# vsSolutionBuildEvent API

vsSolutionBuildEvent provides API layer for [external tools and their various environments](../Scheme/) to access for events/actions and more.

For example, this is already used in the following products:

* [CI.MSBuild](../CI/CI.MSBuild/) - for work through msbuild.exe (Microsoft Build Tools)
* [Devenv Command-Line](../CI/Devenv Command-Line/) - for work through devenv of the Visual Studio

## Where to begin

Scheme of vsSolutionBuildEvent projects:

[![Scheme of vsSolutionBuildEvent projects](../Resources/scheme.png)](../Scheme/)

### 1.14.1+

Please note: **Provider** now distributed together with **Bridge** as part of the API layer.

Specified interfaces to communicate with vsSolutionBuildEvent: [Bridge/](https://github.com/3F/vsSolutionBuildEvent/tree/master/Bridge)

* Download [{{site.lnkCur_API[1]}}]({{site.lnkCur_API[2]}})
    * <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> [Download](/Downloads/)

### Before 1.14.1

**Bridge**

Current module specifies communication with vsSolutionBuildEvent and its related references, for example, [IEvent](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IEvent.cs).

* Download [{{site.lnkCur_API[1]}}]({{site.lnkCur_API[2]}}) ~8Kb
* All binaries of the Bridge: [{{site.lnkAll_API[0]}}]({{site.lnkAll_API[1]}}) (SourceForge)

**Provider**

Contains loader of the core components and related services. Use this to quickly implement basic logic.

* Download [{{site.lnkCur_Provider[1]}}]({{site.lnkCur_Provider[2]}}) ~19Kb
* All binaries of the Bridge: [{{site.lnkAll_Provider[0]}}]({{site.lnkAll_Provider[1]}}) (SourceForge)

### client.vssbe.dll

**client.vssbe.dll** this is subset of our API layer and its **additional way** for work with vsSolutionBuildEvent. 

Use our **[ClientDemo](https://github.com/3F/vsSolutionBuildEvent/tree/master/ClientDemo)** project as template project for implementing your logic.

#### How to create client.vssbe.dll from scratch

* Add our Bridge in `References`
* Firstly, you must implement the [IEntryPointClient](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IEntryPointClient.cs) as you want.
* Provide a correct [IEvent2](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IEvent2.cs) & [IBuild](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IBuild.cs) objects.
* Then build and place your **client.vssbe.dll** in directory with vsSolutionBuildEvent.dll (`Settings` - `Plugin` - `Open directory with plugin`)

##### Demo via ClientDemo

Play with our [ClientDemo](../Examples/Demo/#clientdemo) project!

* Download binary: [{{site.lnkCur_ClientDemo[1]}}]({{site.lnkCur_ClientDemo[2]}}).

![](../Resources/Demo/DemoClient.png)

# References

* [Continuous Integration (CI)](../CI/)
* [Developer Zone](../Dev/)
* [Scheme of vsSolutionBuildEvent projects](../Scheme/)