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

How about calculating the hash value with MD5 & SHA-1 ? and possible syntax like this:

```{{site.sbelang1}}
#[Func hash.MD5("test")]
#[Func hash.SHA1("test")]
```

ok, here's how to (**all minimal logic**):

```csharp
IPM pm = new PM(data); // pointed to - ILevel lvlHash
```

```csharp
// hash.MD5("data")
if(pm.FinalEmptyIs(LevelType.Method, "MD5")) {
    lvlHash.Is("hash.MD5(string data)", ArgumentType.StringDouble);
    return ((string)lvlHash.Args[0].data).MD5Hash();
}

// hash.SHA1("data")
if(pm.FinalEmptyIs(LevelType.Method, "SHA1")) {
    lvlHash.Is("hash.SHA1(string data)", ArgumentType.StringDouble);
    return ((string)lvlHash.Args[0].data).SHA1Hash();
}
```

That's all. Now you can calculate hash value from user scripts with allowed syntax above.

It can be a more flexible, just use other available way: [SNode.IPM](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/SNode/IPM.cs)

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

Argument[] args = pm.FirstLevel.Args;
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

Argument[] args = pm.FirstLevel.Args;
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

Assert.AreEqual(pm.Is(LevelType.Method, "m77"), true);

Argument[] args = pm.FirstLevel.Args;
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

## Logic of IPM

* [SNode](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts/SNode)
    * [IPM interface](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/SNode/IPM.cs)
* Available tests: 
    * [PMTest.cs](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEventTest/SBEScripts/SNode/PMTest.cs)
    * [LevelTest.cs](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEventTest/SBEScripts/SNode/LevelTest.cs)

# References

* [New Component for SBE-Scripts core](../../New Component/)
* [SBEScripts/](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts)
* [Existing components](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts/Components) - **Please note**, some older components still may use old syntax before using new IPM
    * Recents with IPM using:
        * [FunctionComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/FunctionComponent.cs)
        * [SevenZipComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/SevenZipComponent.cs)