---
layout: doc
title: vsSolutionBuildEvent API
permalink: /doc/API/
---
# vsSolutionBuildEvent API

vsSolutionBuildEvent also provides the API level. This can be used with [any external application](../Scheme/) for work with events/actions.

For example, this is already implemented in our products as part of vsSolutionBuildEvent project:

* [CI.MSBuild](../CI/CI.MSBuild/) - for work through msbuild.exe (Microsoft Build Tools)
* [Devenv Command-Line](../CI/Devenv Command-Line/) - for work through devenv of the Visual Studio

## Where to begin

Scheme of vsSolutionBuildEvent projects:

[![Scheme of vsSolutionBuildEvent projects](../Resources/scheme.png)](../Scheme/)

### Bridge

* Download [{{site.lnkCur_API[1]}}]({{site.lnkCur_API[2]}}) (SourceForge.net) ~8Kb
* All binaries of the Bridge: [{{site.lnkAll_API[0]}}]({{site.lnkAll_API[1]}})

You can use Bridge for accessing to our products.

This contains specification of all available features from the vsSolutionBuildEvent and any other specifications of available operations with library, for example:

* [IEvent](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IEvent.cs)
* [Bridge/](https://github.com/3F/vsSolutionBuildEvent/tree/master/Bridge) - all specifications of Bridge


### Provider

* Download [{{site.lnkCur_Provider[1]}}]({{site.lnkCur_Provider[2]}}) (SourceForge.net) ~19Kb
* All binaries of the Bridge: [{{site.lnkAll_Provider[0]}}]({{site.lnkAll_Provider[1]}})

Contains loader of the vsSolutionBuildEvent core and any other methods for rapid accessing and services. Use this for a quick implementation of the basic logic.

### client.vssbe.dll

The `client.vssbe.dll` it's optional variant for work with events from our core library. 

Use our **[ClientDemo](https://github.com/3F/vsSolutionBuildEvent/tree/master/ClientDemo)** project as Template project for this features.

## How to

### Create client.vssbe.dll

* Add our Bridge in `References`
* Firstly, you should implement the [IEntryPointClient](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IEntryPointClient.cs) as you want.
* Provide a correct [IEvent2](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IEvent2.cs) & [IBuild](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/IBuild.cs) objects.
* Then build and place your **client.vssbe.dll** in directory with vsSolutionBuildEvent.dll (`Settings` - `Plugin` - `Open directory with plugin`)

Feel free...

#### ClientDemo

For a quick testing of work see [ClientDemo](../Examples/Demo/#clientdemo) project as **basic sample**.

* Download binary: [{{site.lnkCur_ClientDemo[1]}}]({{site.lnkCur_ClientDemo[2]}}).

![](../Resources/Demo/DemoClient.png)

# References

* [Continuous Integration (CI)](../CI/)
* [Developer Zone](../Dev/)
* [Scheme of vsSolutionBuildEvent projects](../Scheme/)