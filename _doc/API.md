---
layout: doc
title: vsSolutionBuildEvent API
permalink: /doc/API/
---
# vsSolutionBuildEvent API

The vsSolutionBuildEvent is also provides the API level. This can be used with [any external application](../Scheme/) for work with events/actions.

For example, this is already implemented in our products as part of vsSolutionBuildEvent project:

* [CI.MSBuild](../CI/CI.MSBuild/) - for work through msbuild.exe (Microsoft Build Tools)
* [Devenv Command-Line](../CI/Devenv Command-Line/) - for work through devenv of the Visual Studio

## Where to begin

### Bridge

* [Download Bridge_v1.2_[dc72d4c][net40].zip](http://sourceforge.net/projects/vssbe/files/API/Bridge/Bridge_v1.2_%5Bdc72d4c%5D%5Bnet40%5D.zip/download) (SourceForge.net) ~5Kb
* All binaries of the Bridge: [API/Bridge/](https://sourceforge.net/projects/vssbe/files/API/Bridge/)

You can use Bridge for accessing to our products.

This contains specification of all available features from the vsSolutionBuildEvent and any others specifications of available operations with library, for example:

* [IEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/IEvent.cs)
* [Bridge/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/) - all specifications of Bridge


### Provider

* [Download Provider_v2.1_[f9bf5fc][net40].zip](http://sourceforge.net/projects/vssbe/files/API/Provider/Provider_v2.1_%5Bf9bf5fc%5D%5Bnet40%5D.zip/download) (SourceForge.net) ~16Kb
* All binaries of the Bridge: [API/Provider/](https://sourceforge.net/projects/vssbe/files/API/Provider/)

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

You can also see the [ClientDemo](https://github.com/3F/vsSolutionBuildEvent/tree/master/ClientDemo) project for **basic sample**.

* [Download demo - client.vssbe.dll](#) for a quick testing of work with library.

# References

* [Continuous Integration (CI)](../CI/)
* [Developer Zone](../Dev/)
* [Scheme of vsSolutionBuildEvent projects](../Scheme/)