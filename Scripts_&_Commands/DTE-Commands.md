# EnvDTE #

EnvDTE is an assembly-wrapped COM library containing the objects and members for Visual Studio core automation http://msdn.microsoft.com/en-us/library/EnvDTE.aspx

## DTE-Commands ##

All available commands for your IDE you can see with UI-Helper:

* `vsSBE` - `Tools` - `DTE-Commands`

For testing of commands, you can try with testing tool:

* `vsSBE` - `Tools` - `Execution DTE-Commands`


## Examples ##

### Activation of specific configuration & platform ###
```
#!java

Build.SolutionConfigurations(Debug)
Build.SolutionPlatforms(x86)
```

### Cancellation of the build ###

```
#!java

Build.Cancel
```


# References #

* [SBE-Scripts](SBE-Scripts)
* [MSBuild](MSBuild)