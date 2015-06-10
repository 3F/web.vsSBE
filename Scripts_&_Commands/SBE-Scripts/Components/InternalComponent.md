# InternalComponent #

All internal operations with vsSBE.

## events ##

Work with events.

Available events:
```
#!text

Pre, Post, Cancel, Warnings, Errors, OWP, Transmitter, Logging
```

Syntax:
```
#!java

#[vsSBE events.Type.item("name")]
```
```
#!java

#[vsSBE events.Type.item(index)]
```

Sample:
```
#!java

#[vsSBE events.Pre.item("Act1")]
```

### Enabled ###

Gets or Sets Enabled status for selected event-item.

Syntax:
```
#!java

#[vsSBE events.Pre.item("Act1").Enabled = false]
```
```
#!java

#[vsSBE events.Pre.item("Act1").Enabled]
```

### Status ###

Available statuses for selected event-item.

#### HasErrors ####

Checking existence of errors after executed action for selected event-item.

Syntax:
```
#!java

#[vsSBE events.Pre.item("Act1").Status.HasErrors]
```

Sample:
```
#!java

#[(#[vsSBE events.Pre.item("Act1").Enabled]){
    #[Build projects.find("zlib").IsBuildable = false]
}]
```
