# vsSolutionBuildEvent API #

The vsSolutionBuildEvent project also provide the API level. This can be used with any external application for work with events/actions.

For example, this already implemented in our products as part of vsSolutionBuildEvent project:

* [CI.MSBuild](CI/CI.MSBuild) - for work through msbuild.exe
* [Devenv Command-Line](CI/Devenv Command-Line) - for work through devenv of the Visual Studio

## Bridge ##

* [Download Bridge_v1.0_[5d7aa0c].zip](http://sourceforge.net/projects/vssbe/files/API/Bridge/Bridge_v1.0_%5B5d7aa0c%5D.zip/download) (SourceForge.net) 
* All binaries of the Bridge: [API/Bridge/](https://sourceforge.net/projects/vssbe/files/API/Bridge/)

You can use the Bridge for accessing to vsSolutionBuildEvent library.

This contains specification of all available events from the vsSolutionBuildEvent and any others specifications of the available operations with library, for example:

* [IEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/IEvent.cs)
* [Bridge/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/) - all specifications of Bridge


## Provider ##

* [Provider_v1.0_[5d7aa0c].zip](http://sourceforge.net/projects/vssbe/files/API/Provider/Provider_v1.0_%5B5d7aa0c%5D.zip/download) (SourceForge.net)
* All binaries of the Bridge: [API/Provider/](https://sourceforge.net/projects/vssbe/files/API/Provider/)

The Provider already contains loader of the vsSolutionBuildEvent library and any other methods for rapid accessing to this library. Use this for a quick implementation of the basic logic.
