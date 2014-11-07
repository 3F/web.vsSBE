# DTEComponent #

For work with EnvDTE 
(is an assembly-wrapped COM library containing the objects and members for Visual Studio core automation http://msdn.microsoft.com/en-us/library/EnvDTE.aspx)

## exec ##

DTE-command to execution

Syntax:

```
#!java

#[DTE exec: command(arg)]
```

Sample:

```
#!java

#[DTE exec: Build.SolutionPlatforms(x86)] 
#[DTE exec: Build.SolutionConfigurations(Debug_Exclude_Plugins_All)]
```

Note: Some commands should be available only under certain conditions, for example - some stop before some begin... etc.
