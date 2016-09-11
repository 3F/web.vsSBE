---
layout: doc
title: TryComponent
description: Protects from errors in try{...} block and handles it in catch{...}
permalink: /doc/Scripts/SBE-Scripts/Components/TryComponent/
---
# TryComponent

[ v0.12.8+ ]

Protects from errors in try{...} block and handles it in catch{...}

**Available syntax**

```{{site.sbelang}}
#[try {
    ...
}
catch { 
   ...
}]
```

With error type and its message:

```{{site.sbelang}}
#[try
{ 
    ...
}
catch(err, msg)
{
    $(err) - Type of Exception
    $(msg) - Error Message
    ...
}]
```

Samples:

```{{site.sbelang}}
#[try
{

    #[IO copy.file("$(odir)\Release_notes.txt", "$(pDir)bin\$(cfg)\\", true)]
    #[7z pack.files({ 
                "$(pDir)bin\$(cfg)\Bridge.dll", 
                "$(pDir)bin\$(cfg)\Bridge.pdb",
                #[( $(Configuration) ~= "Release" ) { 
                    "$(pDir)bin\$(cfg)\Bridge.xml",
                }]
                "$(pDir)bin\$(cfg)\Release_notes.txt" }, "$(odir)app_v$(numBridge)_[$(branchSha1)][$(netStamp)].zip")]

}
catch
{
    #[NuGet gnt.raw("gnt.core /t:pack /p:ngin=\"$(nupCIMdir)\" /p:ngout=\"$(odir)\"")]
    #[IO delete.directory("$(nupCIMdir)", true)]
}]
```

```{{site.sbelang}}
#[try
{ 
     #[File copy.file("notreal.file", "artefact.t1", false)]
}
catch(err, msg)
{
    #[($(err) == System.IO.FileNotFoundException) {
        #[OWP item("-Build-").writeLine(true): Found error #[$(msg)]]
    }]        
}]
```

```{{site.sbelang}}
#[try {

    #[Box data.pack("header", false): 
    
        ...
    ]

}catch{ }]
```