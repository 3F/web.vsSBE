---
layout: doc
title: BuildComponent
description: Component to managing of building the projects at runtime and similar.
permalink: /doc/Scripts/SBE-Scripts/Components/BuildComponent/
---
# BuildComponent

Component to managing of building the projects at runtime and similar.

# Available operations

## cancel
Immediately cancellation of the build projects

Syntax:

```java 

#[Build cancel = false|true|1|0]
```

Sample:

```java 

#[Build cancel = true]
```

Note: This command may be not available if build not started.

## projects

Work with configuration manager of projects through the SolutionContexts

Syntax:

```java 

#[Build projects.find("name")]
```

Note: The find() property compares as part of the name, and you can use simply like a find("ZenLib") or for unique identification full "Zenlib\ZenLib.vcxproj" etc.

### IsBuildable
Gets or Sets whether the project or project item configuration can be built.

Syntax:

```java 

#[Build projects.find("name").IsBuildable = false|true|1|0]
#[Build projects.find("name").IsBuildable]
```

Sample:

```java 

#[(#[Build projects.find("ZenLib").IsBuildable]){
    Buildable
}]
```

```java 

#[Build projects.find("ZenLib").IsBuildable = false]
```


### IsDeployable ###
Gets or Sets whether the current project is built when the solution configuration associated with this SolutionContext is selected.


Syntax:

```java 

#[Build projects.find("name").IsDeployable = false|true|1|0]
#[Build projects.find("name").IsDeployable]
```

Sample:

```java 

#[(#[Build projects.find("ZenLib").IsDeployable]){
    Buildable
}]
```

```java 

#[Build projects.find("ZenLib").IsDeployable= false]
```

## type

*available with v0.12+*

Gets type of current build action, or last used type if it already finished.

Syntax:

```java 

enum #[Build type]
```

**Note:** allowed types you can see [here](https://bitbucket.org/3F/vssolutionbuildevent/src/master/Bridge/BuildType.cs)