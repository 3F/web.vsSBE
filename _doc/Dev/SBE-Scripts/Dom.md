---
layout: doc
title: Dom & Code Completion
permalink: /doc/Dev/SBE-Scripts/Dom/
---

# Dom & Code Completion

Optional, you can describe your component with [SBEScripts/Dom](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/) for code completion (Intellisense) or to any generation of documentation.

It's easy with next attributes:

## PropertyAttribute

To describe the properties of the component. For example:

```csharp
[Property("propertyName", "Description of the property", CValueType.Boolean, CValueType.Boolean)]
protected string yourLogic()
{
   ...
}
```

```csharp
[Property(
    "IsBuildable", 
    "Gets or Sets whether the project or project item configuration can be built.", 
    "find", 
    "stProjectConf", 
    CValueType.Boolean, 
    CValueType.Boolean
)]
```


Syntax:

```csharp
[Property(string name, string description, CValueType get, CValueType set)]
```

```csharp
[Property(string name, string parent, string method, CValueType get, CValueType set)]
```


Note:

* Type of the get/set should be as [CValueType](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/CValueType.cs)
* The **parent** it's optional argument used for linking on parent element (property/method etc.) if exist
    * The **method** argument should contain the real method name who implements the parent element (property/method etc.) 
* All available constructors see with the [Dom.PropertyAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/PropertyAttribute.cs).

## MethodAttribute

To describe the methods/functions of the component. For example:


```csharp
[
    Method
    (
        "call", 
        "Caller of executable files with arguments.", 
        new string[] { "name", "args" }, 
        new string[] { "Executable file", "Arguments" }, 
        CValueType.Void, 
        CValueType.String, CValueType.String
    )
]
protected string stCall(string data, bool stdOut, bool silent)
{
    ...
}
```

Syntax:

```csharp
[Method(string name, string description, CValueType ret, params CValueType[] args)]
```

```csharp
[Method(string name, string parent, string method, CValueType ret, params CValueType[] args)]
```

Note:

* Type of the get/set should be as [CValueType](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/CValueType.cs)
* The **parent** it's optional argument used for linking on parent element (property/method etc.) if exist
    * The **method** argument should contain the real method name who implements the parent element (property/method etc.) 
* All available constructors see with the [Dom.MethodAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/MethodAttribute.cs)

## ComponentAttribute

To describe the new component. For example:

```csharp
[Component("File", "I/O operations")]
public class FileComponent: Component, IComponent
{
    ...
}
```
Syntax:

```csharp
[Component(string name, string description)]
```

All available constructors see with the [Dom.ComponentAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/ComponentAttribute.cs)

### Aliases

```csharp
[Component("Primary", new string[]{ "Alias1", "Alias2", "Alias3" }, "description")]
```

## DefinitionAttribute

To describe the any definition of the component. For example:

```csharp
[Definition("(true) { }", "Conditionals statements\n\n(1 > 2) {\n ... \n}")]
public class ConditionComponent: Component, IComponent
{
    ...
}
```

```csharp
[Definition("var name", "Get data from variable the 'name'")]
[Definition("var name = data", "Set the 'data' for variable the 'name'")]
```

Syntax:

```csharp
[Definition(string name, string description)]
```

All available constructors see with the [Dom.DefinitionAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/DefinitionAttribute.cs)

# References

* [New Component for SBE-Scripts core](../../New Component/)
* [SBEScripts/](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts)