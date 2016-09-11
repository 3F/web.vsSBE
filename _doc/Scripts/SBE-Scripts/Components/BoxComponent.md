---
layout: doc
title: BoxComponent
description: Container of data for operations like a template, repeating, etc.
permalink: /doc/Scripts/SBE-Scripts/Components/BoxComponent/
---
# BoxComponent

[ v0.12.8+ ]

Container of data for operations like a template, repeating, etc.

## repeat

Executes a block until a specified expression evaluates to false.

**Available syntax**

```{{site.sbelang1}}
repeat(expression condition [; boolean silent]): mixed data
```

Where:

* condition - Conditional expression like ((1 < 2) && true) etc. - see examples in [ConditionComponent](../ConditionComponent/)
* silent - Flag of silent mode.

Samples:

```{{site.sbelang3}}
#[Box repeat($(i) < 10; true): 

    #[File append("test.txt"): 
        #[$(i)] 
    ]

    $(i = $([MSBuild]::Add($(i), 1)))
]
```

```{{site.sbelang3}}
#[Box repeat($(flag)): 
    ...
]
```

## iterate

Executes a block when condition is true.

**Available syntax**

```{{site.sbelang3}}
iterate(initializer; condition; iterator): mixed data
```

Where:

* initializer - **Optional** initial state.
* condition - Conditional expression like ((1 < 2) && true) etc. - see examples in [ConditionComponent](../ConditionComponent/)
* iterator - **Optional** operation after each iteration

Samples:

```{{site.sbelang3}}
#[Box iterate(i = 0; $(i) < 10; i += 1): 
   ...
]
```

```{{site.sbelang3}}
#[Box iterate(i = 0; $(i) < 10; i = $([MSBuild]::Add($(i), 1))): 
    ...
]
```

```{{site.sbelang3}}
#[Box iterate(; $(flag); ): 
    ...
]
```

## operators

Access to common operators.

### sleep

Suspends the current thread for a specified time.

**Available syntax**

```{{site.sbelang}}
void operators.sleep(integer timeout)
```

Where:

* timeout - Block current thread for a specified time in milliseconds.

Samples:

```{{site.sbelang}}
#[Box operators.sleep(250)]
```

```{{site.sbelang3}}
#[Box iterate(i = 0; $(i) < 10; i += 1): 
    ...
    #[Box operators.sleep(250)]
]
```

## data

Main templates with data.

Samples:

```{{site.sbelang3}}
#[try {

    #[Box data.pack("header", false): 
    
        #[$(data = "Hello $(user) !")]
        #[File appendLine("$(fname)"): ------ #[$(data)] ------ ]
    ]

}catch{ }]

#[$(fname = 'f1.txt')]
#[$(user  = 'UserA')]
#[Box data.get("header", true)]

#[$(user = 'UserB')]
#[Box data.get("header", true)]
```

```
 ------ Hello UserA ! ------ 
 ------ Hello UserB ! ------ 
```

### pack

To pack mixed data into container.

**Available syntax**

```{{site.sbelang}}
void data.pack(string name, boolean eval): In
```

Where:

* name - The name of package.
* eval - Flag of evaluation of data before packing.
* In - mixed data

Samples:

```{{site.sbelang3}}
#[Box data.pack("test1", false): 
    ...
]
```

```{{site.sbelang3}}
#[try {

    #[Box data.pack("header", false): 
    
        ...
    ]

}catch{ }]
```

### free

To release existing package from container.

**Available syntax**

```{{site.sbelang}}
data.free(string name)
```

Where:

* name - The name of package.

Samples:

```{{site.sbelang}}
#[Box data.free("test")]
```

### get

To get package data.

**Available syntax**

```{{site.sbelang}}
data.get(string name, boolean forceEval)
```

Where:

* name - The name of package.
* forceEval - To force evaluate data of package before receiving.

Samples:

```{{site.sbelang}}
#[Box data.get("test", true)]
```

### clone

Multiple getting package data.

**Available syntax**

```{{site.sbelang}}
data.clone(string name, integer count [, boolean forceEval])
```

Where:

* name - The name of package.
* count - The number of clones.
* forceEval - To force evaluate data of package before receiving.

Samples:

```{{site.sbelang}}
#[Box data.clone("test", 4)]
```