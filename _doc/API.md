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

* [Download Bridge_v1.3_[8bde22a][net40].zip](http://sourceforge.net/projects/vssbe/files/API/Bridge/Bridge_v1.3_%5B8bde22a%5D%5Bnet40%5D.zip/download) (SourceForge.net) ~8Kb
* All binaries of the Bridge: [API/Bridge/](https://sourceforge.net/projects/vssbe/files/API/Bridge/)

You can use Bridge for accessing to our products.

This contains specification of all available features from the vsSolutionBuildEvent and any others specifications of available operations with library, for example:

* [IEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/IEvent.cs)
* [Bridge/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/) - all specifications of Bridge


### Provider

* [Download Provider_v3.0_[8bde22a][net40].zip](http://sourceforge.net/projects/vssbe/files/API/Provider/Provider_v3.0_%5B8bde22a%5D%5Bnet40%5D.zip/download) (SourceForge.net) ~19Kb
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

* Download demo - client.vssbe.dll: [ClientDemo_[8bde22a][net40]&#40;2692&#41;.zip](http://sourceforge.net/projects/vssbe/files/dev/clients/client.vssbe.dll/ClientDemo_%5B8bde22a%5D%5Bnet40%5D%282692%29.zip/download) for a quick testing of work with library.
    * All binaries of ClientDemo: [/dev/clients/client.vssbe.dll/](https://sourceforge.net/projects/vssbe/files/dev/clients/client.vssbe.dll/)

# References

* [Continuous Integration (CI)](../CI/)
* [Developer Zone](../Dev/)
* [Scheme of vsSolutionBuildEvent projects](../Scheme/)