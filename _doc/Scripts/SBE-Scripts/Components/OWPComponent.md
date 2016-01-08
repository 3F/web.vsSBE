---
layout: doc
title: OWPComponent
description: Works with OWP and similar operations.
permalink: /doc/Scripts/SBE-Scripts/Components/OWPComponent/
---
# OWPComponent

For work with OWP (Output Window Pane) and similar operations.

## log

[ v0.11+ ]

Provides data from events of logging.

### Message

Current message from log.

Syntax:

```java
string log.Message
```

### Level

The Level of current Message

Syntax:

```java
string log.Level
```

## item

[ v0.11+ ]

Access to item of the Output window by name.

Syntax:

```java
item(string name)
```

Arguments:

* name - Name of item.

### write

Writes data into selected pane.

Syntax:

```java
void write(boolean force): content
```

Arguments:

* force - Creates selected item if it does not exist for true value.

Sample:

```minid
#[OWP item("My Item").write(true): mixed data]
```

### writeLine

Writes data with newline symbol into selected pane.

Syntax:

```java
void writeLine(boolean force): content
```

Arguments:

* force - Creates selected item if it does not exist for true value.

Sample:

```minid
#[OWP item("Build").writeLine(false): mixed data]
```

### delete

Removes pane. Returns false value if item does not exist, otherwise true as a successfully deleted.

Syntax:

```java
boolean delete = boolean
```

Sample:

```minid
#[OWP item("My Item").delete = true]
```

### clear

To clear contents from OW pane. Returns false value if item does not exist, otherwise true as a successfully cleared.

Syntax:

```java
boolean clear = boolean
```

Sample:

```minid
#[OWP item("My Item").clear = true]
```

### activate

To activate (display) OW pane by item name.

Syntax:

```java 
boolean activate = boolean
```

Sample:

```minid
#[OWP item("My Item").activate = true]
```

## out

For streaming of getting the mixed data from selected pane.

Syntax:

```java 

#[OWP out(string ident [, boolean isGuid])]
```

Arguments:

* ident - Name of pane.
* isGuid - Optional flag to use Guid as identifier if true, otherwise as name of item. (only for v0.12.5+). [MSDN. Guids of Output Pane](https://msdn.microsoft.com/en-us/library/bb166496.aspx?f=255&MSPPError=-2147217396#Anchor_4)
    * BuildOrder: `2032b126-7c8d-48ad-8026-0e0348004fc0`
    * BuildOutput: `1BD8A850-02D1-11d1-BEE7-00A0C913D1F8`
    * DebugOutput: `FC076020-078A-11D1-A7DF-00A0C9110051`
    * [...](https://msdn.microsoft.com/en-us/library/bb166496.aspx?f=255&MSPPError=-2147217396#Anchor_4)

Sample:

```java 

#[OWP out("Build")]
```

Note: The "Build" item is used by default with property `out` as alias:

```java 

#[OWP out]
```

Also used as short alias for: `out.All`

### All

Get raw data from selected item if exists:

```java
string #[OWP out.All]
```

### Warnings

For work with warnings from received data. Also used as short alias for: `Warnings.Raw`

```java
string #[OWP out.Warnings]
```

#### Raw

Returns the partial raw data with warnings if an exists:

```java
string #[OWP out.Warnings.Raw]
```

<!-- -->

#### Count 

Count of warnings from data.

```java
integer #[OWP out.Warnings.Count]
```

#### Codes

List of warnings from data as C4702,4505,.. :

```java 

List #[OWP out.Warnings.Codes]
```

### Errors

For work with errors from received data. Also used as short alias for: `Errors.Raw`

```java 

 string #[OWP out.Errors]
```
 
#### Raw

Returns the partial raw data with errors if an exists:

```java 

string #[OWP out.Errors.Raw]
```

#### Count

Count of errors from data.

```java 

Integer #[OWP out.Errors.Count]
```

#### Codes

List of errors from data as C4702,C4505,.. :

```java 

List #[OWP out.Errors.Codes]
```
