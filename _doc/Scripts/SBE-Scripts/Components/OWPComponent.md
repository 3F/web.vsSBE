---
layout: doc
title: OWPComponent
permalink: /doc/Scripts/SBE-Scripts/Components/OWPComponent/
---
# OWPComponent

For work with OWP (Output Window Pane) and similar operations.

## log

**available with v0.11**

Provides data from events of logging.

### Message

Current message from log.

Syntax:

```java 

#[OWP log.Message]
```

### Level

Level for current property the Message.

Syntax:

```java 

#[OWP log.Level]
```

## item ##

**available with v0.11**

Access to item of the Output window by name.

Syntax:

```java 

#[OWP item("name")]
```

### write ###

Writes data into selected pane.

Syntax:

```java 

#[OWP item("name").write(boolean createIfNotExist): content]
```

### writeLine ###

Writes data with the newline char into selected pane.

Syntax:

```java 

#[OWP item("name").writeLine(boolean createIfNotExist): content]
```

### delete ###

Removes pane. Returns false if this item not exist, and true value if is successfully deleted.

Syntax:

```java 

#[OWP item("name").delete = true]
```

### clear ###

Clear contents of item. Returns false if this item not exist, and true value if is clean.

Syntax:

```java 

#[OWP item("name").clear = true]
```

### activate ###

Activate(Display) item.

Syntax:

```java 

#[OWP item("name").activate = true]
```

## out ##

Gets mixed data from the OWP. Returns the partial raw from all build log

Syntax:

```java 

#[OWP out("name of item")]
```
Sample:

```java 

#[OWP out("Build")]
```
Note: The "Build" item used by default.

Syntax with item by default:

```java 

#[OWP out]
```

### The Build item ###

* Partial raw from all build log:

```java 

#[OWP out.All]
```

```java 

#[OWP out]
```

* Partial raw with warning/s:

```java 

#[OWP out.Warnings.Raw]
```

```java 

#[OWP out.Warnings]
```

*  Count of warnings:

```java 

#[OWP out.Warnings.Count]
```

* List of warnings as C4702,4505 ... :

```java 

#[OWP out.Warnings.Codes]
```

* Partial raw with error/s:

```java 

#[OWP out.Errors.Raw]
```

```java 

#[OWP out.Errors]
```

* Count of errors:

```java 

#[OWP out.Errors.Count]
```

* List of errors as C4702,C4505 ... :

```java 

#[OWP out.Errors.Codes]
```

