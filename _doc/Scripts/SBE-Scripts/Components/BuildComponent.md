---
layout: doc
title: BuildComponent
description: Managing of build projects at runtime and similar operations with build processes, solution and projects.
permalink: /doc/Scripts/SBE-Scripts/Components/BuildComponent/
---
# BuildComponent

Managing of build projects at runtime and similar operations with build processes, solution and projects.

# Available operations

## cancel

Cancel build immediately if true.

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

Work with configuration manager of projects through SolutionContexts.

### find()

Compares as part of name, and you can use simply like a find("ZenLib") or for unique identification full "Zenlib\ZenLib.vcxproj" etc.

Syntax:

```java 

#[Build projects.find("name")]
```

#### IsBuildable

Gets or Sets. Whether the project or item configuration of project can be built. Associated with current SolutionContext.

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


#### IsDeployable

Gets or Sets. Whether the current project or item configuration of project can be deployed. Associated with current SolutionContext.


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

Get type of current build action, or last used type if it already finished.

Syntax:

```java 

enum #[Build type]
```

**Note:** allowed types you can see [here](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/BuildType.cs)

## solution

*available with v0.12.4+*

Work with solution data.

### current

Link to current used solution.

Syntax:

```java 

#[Build solution.current]
```

### path()

Use specific solution from selected path.

Syntax:

```java 

#[Build solution.path(string sln)]
```

Arguments:

* sln - Full path to solution file.

#### First

First project in Project Build Order.

Syntax:

```java 

Project #[Build solution.path(string sln).First]
```

Return type is a [Project](#project-type)

Samples:

```java 

#[Build solution.current.First.path]
#[Build solution.path("D:\tmp\app.sln").First.guid]
```

#### Last

Last project in Project Build Order.

Syntax:

```java 

Project #[Build solution.path(string sln).Last]
```

Return type is a [Project](#project-type)

#### FirstRaw

First project from defined list. Ignores used Build type.

Syntax:

```java 

Project #[Build solution.path(string sln).FirstRaw]
```

Return type is a [Project](#project-type)

#### LastRaw

Last project from defined list. Ignores used Build type.

Syntax:

```java 

Project #[Build solution.path(string sln).LastRaw]
```

Return type is a [Project](#project-type)

#### GuidList

Get list of project Guids. In direct order of definition.

Syntax:

```java 

List #[Build solution.path(string sln).GuidList]
```

Return type is a List of projects guids, for example:

```
{73919171-44B6-4536-B892-F1FCA653887C},{4262A1DC-768F-43CC-85F5-A4ED9CD034CC},{A7BF1F9C-F18D-423E-9354-859DC3CFAFD4}, ...
```

#### projectBy

Get project by Guid string.

```java 

Project #[Build solution.path(string sln).projectBy(string guid)]
```

Arguments:

* sln - Full path to solution file.
* guid - Identifier of project.

Return type is a [Project](#project-type)

Samples:

```java

#[Build solution.path("D:\vsSolutionBuildEvent_2013.sln").projectBy("{97F0E2FF-42DB-4506-856D-8694DD99F827}").name]
```

## Types

### Project type

Property name | Description
-----|---------------------
name | The name of project. 
path | Path to project.
type | Type of project.
guid | Guid of project.
