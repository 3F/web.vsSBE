# vsSolutionBuildEvent API

The vsSolutionBuildEvent project also provide the API level. This can be used with any external application for work with events/actions.

For example, this already implemented in our products as part of vsSolutionBuildEvent project:

* [CI.MSBuild](CI/CI.MSBuild) - for work through msbuild.exe (Microsoft Build Tools)
* [Devenv Command-Line](CI/Devenv Command-Line) - for work through devenv of the Visual Studio

## Bridge

* [Download Bridge_v1.1_[e9ad3bd][net40].zip](http://sourceforge.net/projects/vssbe/files/API/Bridge/Bridge_v1.1_%5Be9ad3bd%5D%5Bnet40%5D.zip/download) (SourceForge.net) ~5Kb
* All binaries of the Bridge: [API/Bridge/](https://sourceforge.net/projects/vssbe/files/API/Bridge/)

You can use the Bridge for accessing to vsSolutionBuildEvent library.

This contains specification of all available features from the vsSolutionBuildEvent and any others specifications of the available operations with library, for example:

* [IEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/IEvent.cs)
* [Bridge/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/) - all specifications of Bridge


## Provider

* [Provider_v2.0_[e9ad3bd][net40].zip](http://sourceforge.net/projects/vssbe/files/API/Provider/Provider_v2.0_%5Be9ad3bd%5D%5Bnet40%5D.zip/download) (SourceForge.net) ~15Kb
* All binaries of the Bridge: [API/Provider/](https://sourceforge.net/projects/vssbe/files/API/Provider/)

The Provider already contains loader of the vsSolutionBuildEvent library and any other methods for rapid accessing etc. Use this for a quick implementation of the basic logic.


# References

* [Continuous Integration (CI)](CI)
* [Developer Zone](Developer Zone)
* [Scheme of vsSolutionBuildEvent projects](scheme)