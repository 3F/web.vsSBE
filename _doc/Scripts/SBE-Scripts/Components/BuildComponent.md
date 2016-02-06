---
layout: doc
title: BuildComponent
description: Managing of build process at runtime. And similar operations for projects and solution.
permalink: /doc/Scripts/SBE-Scripts/Components/BuildComponent/
---
# BuildComponent

Managing of build process at runtime. And similar operations for projects and solution.

# Available operations

## cancel

To immediately cancel the build task if it's possible.

Syntax:

```{{site.sbelang1}}
void cancel = boolean
```

Sample:

```{{site.sbelang}}
#[Build cancel = true]
```

## projects

Work with configuration manager of projects through SolutionContexts.

### find()

To find project by name. It compares part of name, therefore you can use simply like a "ZenLib" or full name "Zenlib\ZenLib.vcxproj" etc.

Syntax:

```{{site.sbelang1}}
#[Build projects.find("name")]
```

#### IsBuildable

Gets or Sets. Whether the project or item configuration of project can be built. Associated with current SolutionContext.

Syntax:

```{{site.sbelang1}}
#[Build projects.find("name").IsBuildable = false|true|1|0]
#[Build projects.find("name").IsBuildable]
```

Sample:

```{{site.sbelang1}}
#[(#[Build projects.find("ZenLib").IsBuildable]){
    Buildable
}]
```

```{{site.sbelang1}}
#[Build projects.find("ZenLib").IsBuildable = false]
```


#### IsDeployable

Gets or Sets. Whether the current project or item configuration of project can be deployed. Associated with current SolutionContext.


Syntax:

```{{site.sbelang1}}
#[Build projects.find("name").IsDeployable = false|true|1|0]
#[Build projects.find("name").IsDeployable]
```

Sample:

```{{site.sbelang1}}
#[(#[Build projects.find("ZenLib").IsDeployable]){
    Buildable
}]
```

```{{site.sbelang1}}
#[Build projects.find("ZenLib").IsDeployable= false]
```

## type

*available with v0.12+*

Get type of current build action, or last used type if it already finished.

Syntax:

```{{site.sbelang1}}
enum #[Build type]
```

**Note:** allowed types you can see [here](https://github.com/3F/vsSolutionBuildEvent/blob/master/Bridge/BuildType.cs)

## solution

*available with v0.12.4+*

Work with solution data.

### current

Link to current used solution.

Syntax:

```{{site.sbelang1}}
#[Build solution.current]
```

### path()

Use specific solution from selected path.

Syntax:

```{{site.sbelang1}}
#[Build solution.path(string sln)]
```

Arguments:

* sln - Full path to solution file.

#### First

First project in Project Build Order.

Syntax:

```{{site.sbelang1}}
Project #[Build solution.path(string sln).First]
```

Return type is a [Project](#project-type)

Samples:

```{{site.sbelang1}}
#[Build solution.current.First.path]
#[Build solution.path("D:\tmp\app.sln").First.guid]
```

#### Last

Last project in Project Build Order.

Syntax:

```{{site.sbelang1}}
Project #[Build solution.path(string sln).Last]
```

Return type is a [Project](#project-type)

#### FirstRaw

First project from defined list. Ignores used Build type.

Syntax:

```{{site.sbelang1}}
Project #[Build solution.path(string sln).FirstRaw]
```

Return type is a [Project](#project-type)

#### LastRaw

Last project from defined list. Ignores used Build type.

Syntax:

```{{site.sbelang1}}
Project #[Build solution.path(string sln).LastRaw]
```

Return type is a [Project](#project-type)

#### GuidList

Get list of project Guids. In direct order of definition.

Syntax:

```{{site.sbelang1}}
List #[Build solution.path(string sln).GuidList]
```

Return type is a List of projects guids, for example:

```java
{73919171-44B6-4536-B892-F1FCA653887C},{4262A1DC-768F-43CC-85F5-A4ED9CD034CC},{A7BF1F9C-F18D-423E-9354-859DC3CFAFD4}, ...
```

#### projectBy

Get project by Guid string.

```{{site.sbelang1}}
Project #[Build solution.path(string sln).projectBy(string guid)]
```

Arguments:

* sln - Full path to solution file.
* guid - Identifier of project.

Return type is a [Project](#project-type)

Samples:

```{{site.sbelang1}}
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
