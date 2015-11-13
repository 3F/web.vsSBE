---
layout: doc
title: IPM analyzer for SBE-Scripts core
permalink: /doc/Dev/SBE-Scripts/IPM/
---

# IPM analyzer

With latest changes you can also use our IPM analyzer for parsing of any properties & methods.

It useful for a quick implementation of any logic for new or existing component.

## Overview

All magic of this starts with:

```csharp
IPM pm = new PM(data)
```

Where **data** it's your raw data 'as is'. Then, you can work with parsed data via pm instance.

### Properties

{% include elem/fillme %}

### Methods

{% include elem/fillme %}

#### Arguments

[Available types](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/SNode/ArgumentType.cs):

```csharp

    // Unspecified mixed data.
    Mixed,

    // Common string.
    String,

    // String from single quotes.
    StringSingle,

    // String from double quotes.
    StringDouble,

    // Single symbol from single quotes
    Char,

    // Boolean data.
    Boolean,

    // Signed Integer number.
    Integer,

    // Signed floating-point number with single-precision.
    Float,

    // Signed floating-point number with double-precision.
    Double,

    // Unspecified predefined data.
    EnumOrConst,

    // Predefined data as Enum.
    Enum,

    // Predefined data as Const.
    Const,

    // Object data. Similar as array with mixed data. Format: { "p1", true, { 12, 'n', -4.5f }, 12d }
    Object,
```

* Samples:

```csharp

IPM pm = new PM("solution(\"str data\", 'str data2', 12, -12, 1.5, -1.5, STDOUT, TestEnum.SpecialType, mixed * data, true)");

Argument[] args = pm.Levels[0].Args;
Assert.AreEqual(args[0].type, ArgumentType.StringDouble);
Assert.AreEqual(args[0].data, "str data");

Assert.AreEqual(args[1].type, ArgumentType.StringSingle);
Assert.AreEqual(args[1].data, "str data2");

Assert.AreEqual(args[2].type, ArgumentType.Integer);
Assert.AreEqual(args[2].data, 12);

Assert.AreEqual(args[3].type, ArgumentType.Integer);
Assert.AreEqual(args[3].data, -12);

Assert.AreEqual(args[4].type, ArgumentType.Double);
Assert.AreEqual(args[4].data, 1.5);

Assert.AreEqual(args[5].type, ArgumentType.Double);
Assert.AreEqual(args[5].data, -1.5);

Assert.AreEqual(args[6].type, ArgumentType.EnumOrConst);
Assert.AreEqual(args[6].data, "STDOUT");

Assert.AreEqual(args[7].type, ArgumentType.EnumOrConst);
Assert.AreEqual(args[7].data, "TestEnum.SpecialType");

Assert.AreEqual(args[8].type, ArgumentType.Mixed);
Assert.AreEqual(args[8].data, "mixed * data");

Assert.AreEqual(args[9].type, ArgumentType.Boolean);
Assert.AreEqual(args[9].data, true);
```

* floating-point numbers:

```csharp

IPM pm = new PM(" solution (1.5, -1.5, 1.5f, -1.5f, 1.5d, -1.5d) ");

Argument[] args = pm.Levels[0].Args;
Assert.AreEqual(args[0].type, ArgumentType.Double);
Assert.AreEqual(args[0].data, 1.5d);

Assert.AreEqual(args[1].type, ArgumentType.Double);
Assert.AreEqual(args[1].data, -1.5d);

Assert.AreEqual(args[2].type, ArgumentType.Float);
Assert.AreEqual(args[2].data, 1.5f);

Assert.AreEqual(args[3].type, ArgumentType.Float);
Assert.AreEqual(args[3].data, -1.5f);

Assert.AreEqual(args[4].type, ArgumentType.Double);
Assert.AreEqual(args[4].data, 1.5d);

Assert.AreEqual(args[5].type, ArgumentType.Double);
Assert.AreEqual(args[5].data, -1.5d);

```

* Object data. Similar as array with mixed data:

```csharp

IPM pm = new PM(" m77(\"guid\", 12, {\"p1\", {4, \"test\", 8, 'y'}, true}, {false, 'p2'}) ");

Assert.AreEqual(pm.Is(0, LevelType.Method, "m77"), true);

Argument[] args = pm.Levels[0].Args;
Assert.AreEqual(args.Length, 4);

Assert.AreEqual(args[0].type, ArgumentType.StringDouble);
Assert.AreEqual(args[0].data, "guid");

Assert.AreEqual(args[1].type, ArgumentType.Integer);
Assert.AreEqual(args[1].data, 12);

Assert.AreEqual(args[2].type, ArgumentType.Object);
{
    Argument[] args2 = (Argument[])args[2].data;
    Assert.AreEqual(args2.Length, 3);

    Assert.AreEqual(args2[0].type, ArgumentType.StringDouble);
    Assert.AreEqual(args2[0].data, "p1");

    Assert.AreEqual(args2[1].type, ArgumentType.Object);
    {
        Argument[] args21 = (Argument[])args2[1].data;
        Assert.AreEqual(args21.Length, 4);

        Assert.AreEqual(args21[0].type, ArgumentType.Integer);
        Assert.AreEqual(args21[0].data, 4);

        Assert.AreEqual(args21[1].type, ArgumentType.StringDouble);
        Assert.AreEqual(args21[1].data, "test");

        Assert.AreEqual(args21[2].type, ArgumentType.Integer);
        Assert.AreEqual(args21[2].data, 8);

        Assert.AreEqual(args21[3].type, ArgumentType.Char);
        Assert.AreEqual(args21[3].data, 'y');
    }

    Assert.AreEqual(args2[2].type, ArgumentType.Boolean);
    Assert.AreEqual(args2[2].data, true);
}

Assert.AreEqual(args[3].type, ArgumentType.Object);
{
    Argument[] args3 = (Argument[])args[3].data;
    Assert.AreEqual(args3.Length, 2);

    Assert.AreEqual(args3[0].type, ArgumentType.Boolean);
    Assert.AreEqual(args3[0].data, false);

    Assert.AreEqual(args3[1].type, ArgumentType.StringSingle);
    Assert.AreEqual(args3[1].data, "p2");
}
``` 

## How to

How about calculating hash value with MD5 & SHA-1 ? and possible syntax like this:

```java

#[Func hash.MD5("test")]
#[Func hash.SHA1("test")]
```

ok, here's how to (full minimal logic):

```csharp

IPM pm = new PM(data); // pointed to 'hash' level
```

```csharp

if(pm.FinalEmptyIs(1, LevelType.Method, "MD5"))
{
    Argument[] args = pm.Levels[1].Args;
    if(args.Length != 1 || args[0].type != ArgumentType.StringDouble) {
        throw new InvalidArgumentException("stHash: incorrect arguments to `hash.MD5(string data)`");
    }
    return ((string)args[0].data).MD5Hash();
}
```

```csharp

if(pm.FinalEmptyIs(1, LevelType.Method, "SHA1"))
{
    Argument[] args = pm.Levels[1].Args;
    if(args.Length != 1 || args[0].type != ArgumentType.StringDouble) {
        throw new InvalidArgumentException("stHash: incorrect arguments to `hash.SHA1(string data)`");
    }
    return ((string)args[0].data).SHA1Hash();
}
```

### A more complex example

Let's consider a real example (this, for example, used in [BuildComponent](../../../Scripts/SBE-Scripts/Components/BuildComponent/#solution))

If you want to work with next syntax, for example:

```java

#[Build solution]
#[Build solution.current]
#[Build solution.path("D:\app.sln")]

#[Build solution.current.First]
#[Build solution.current.FirstRaw]
#[Build solution.current.projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}")]
#[Build solution.current.Last]
#[Build solution.current.LastRaw]

#[Build solution.path("D:\app.sln").First]
#[Build solution.path("D:\app.sln").FirstRaw]
#[Build solution.path("D:\app.sln").projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}")]
#[Build solution.path("D:\app.sln").Last]
#[Build solution.path("D:\app.sln").LastRaw]

#[Build solution.current.GuidList]

#[Build solution.current.First.guid]
#[Build solution.current.First.name]
#[Build solution.current.First.path]
#[Build solution.current.First.type]

#[Build solution.current.FirstRaw.guid]
#[Build solution.current.FirstRaw.name]
#[Build solution.current.FirstRaw.path]
#[Build solution.current.FirstRaw.type]

#[Build solution.current.projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").guid]
#[Build solution.current.projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").name]
#[Build solution.current.projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").path]
#[Build solution.current.projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").type]

#[Build solution.current.Last.guid]
#[Build solution.current.Last.name]
#[Build solution.current.Last.path]
#[Build solution.current.Last.type]

#[Build solution.current.LastRaw.guid]
#[Build solution.current.LastRaw.name]
#[Build solution.current.LastRaw.path]
#[Build solution.current.LastRaw.type]

#[Build solution.path("D:\app.sln").GuidList]

#[Build solution.path("D:\app.sln").First.guid]
#[Build solution.path("D:\app.sln").First.name]
#[Build solution.path("D:\app.sln").First.path]
#[Build solution.path("D:\app.sln").First.type]

#[Build solution.path("D:\app.sln").FirstRaw.guid]
#[Build solution.path("D:\app.sln").FirstRaw.name]
#[Build solution.path("D:\app.sln").FirstRaw.path]
#[Build solution.path("D:\app.sln").FirstRaw.type]

#[Build solution.path("D:\app.sln").projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").guid]
#[Build solution.path("D:\app.sln").projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").name]
#[Build solution.path("D:\app.sln").projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").path]
#[Build solution.path("D:\app.sln").projectBy("{47FEEF62-6D0B-4ACE-B888-0F4FDF5089E6}").type]

#[Build solution.path("D:\app.sln").Last.guid]
#[Build solution.path("D:\app.sln").Last.name]
#[Build solution.path("D:\app.sln").Last.path]
#[Build solution.path("D:\app.sln").Last.type]

#[Build solution.path("D:\app.sln").LastRaw.guid]
#[Build solution.path("D:\app.sln").LastRaw.name]
#[Build solution.path("D:\app.sln").LastRaw.path]
#[Build solution.path("D:\app.sln").LastRaw.type]

+ additional managing of right operand for all above on any level, for example:

#[Build solution.current.LastRaw.name = "test"]
#[Build solution.current.LastRaw.name: "stream input"]
etc.

+ control of existing (that should be and that is not) for all levels

and similar..

```

With IPM you can simply, like this (full logic):


```csharp

protected string stSolution(string data)
{
    IPM pm = new PM(data);
    
    if(!pm.Is(0, LevelType.Property, "solution")) {
        throw new SyntaxIncorrectException("Failed stSolution - '{0}'", data);
    }

    if(pm.Is(1, LevelType.Property, "current")) {
        return stSlnPMap(env.SolutionFile, pm.pinTo(2));
    }

    if(pm.Is(1, LevelType.Method, "path"))
    {
        Argument[] args = pm.Levels[1].Args;
        if(args.Length != 1 || args[0].type != ArgumentType.StringDouble) {
            throw new InvalidArgumentException("stSolution: incorrect arguments to `solution.path(string sln)`");
        }
        return stSlnPMap((string)args[0].data, pm.pinTo(2));
    }
    
    throw new OperationNotFoundException();
}

protected string stSlnPMap(string sln, IPM pm)
{
    ProjectsMap map = getProjectsMap(sln);

    if(pm.Is(0, LevelType.Property, "First")) {
        return projectsMap(map.FirstBy(env.BuildType), pm.pinTo(1));
    }

    if(pm.Is(0, LevelType.Property, "Last")) {
        return projectsMap(map.LastBy(env.BuildType), pm.pinTo(1));
    }

    if(pm.Is(0, LevelType.Property, "FirstRaw")) {
        return projectsMap(map.First, pm.pinTo(1));
    }

    if(pm.Is(0, LevelType.Property, "LastRaw")) {
        return projectsMap(map.Last, pm.pinTo(1));
    }

    if(pm.FinalEmptyIs(0, LevelType.Property, "GuidList")) {
        return Value.from(map.GuidList);
    }

    if(pm.Is(0, LevelType.Method, "projectBy"))
    {
        Argument[] args = pm.Levels[0].Args;
        if(args.Length != 1 || args[0].type != ArgumentType.StringDouble) {
            throw new InvalidArgumentException("stSlnPMap: incorrect arguments to `projectBy(string guid)`");
        }
        return projectsMap(map.getProjectBy((string)args[0].data), pm.pinTo(1));
    }

    throw new OperationNotFoundException();
}

protected string projectsMap(ProjectsMap.Project project, IPM pm)
{
    if(pm.FinalEmptyIs(0, LevelType.Property, "name")) {
        return project.name;
    }

    if(pm.FinalEmptyIs(0, LevelType.Property, "path")) {
        return project.path;
    }

    if(pm.FinalEmptyIs(0, LevelType.Property, "type")) {
        return project.type;
    }

    if(pm.FinalEmptyIs(0, LevelType.Property, "guid")) {
        return project.guid;
    }

    throw new OperationNotFoundException();
}
```

That's really all.. want to see in action ? 

This already implemented in [BuildComponent](../../../Scripts/SBE-Scripts/Components/BuildComponent/#solution):

* `Settings` - `Tools` - `SBE-Scripts Testing tool` then start with #[Build ..

## Logic of IPM

* Available tests: [/vsSolutionBuildEventTest/SBEScripts/SNode/PMTest.cs](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEventTest/SBEScripts/SNode/PMTest.cs)
* [SNode](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts/SNode)
    * [PM implementation](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/SNode/PM.cs)

# References

* [New Component for SBE-Scripts core](../../New Component/)
* [SBEScripts/](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts)