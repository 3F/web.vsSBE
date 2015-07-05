# Solution-wide Build Events

Any actions for Pre-Build / Post-Build event **can be for all projects at once**. (You should remember this for work with [MSBuild](../Scripts_&_Commands/MSBuild) engine)

[![scripts for all projects at once](https://bitbucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/obsolete/vbs_ext.jpg)](Confirmation dialog)

You can use as a [Simple caller - with your external logic](Confirmation dialog) or use the [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) or [DTE-Commands](../Scripts_&_Commands/DTE-Commands) or similar internal scripts with any interpreter such as php, python, PowerShell, Wscript, Node.js, etc.

for example: notification - send email before/after building of all projects:

```
#!php

mail('yourmail@example.com', 'Build completed', date('H:i:s'));
```

or more complex like this:

```
#!php

class GArtefacts 
{ 
    /* ... */   
    public function render() 
    { 
         try{ 
            $db = new PDO(Factory::sqlite("positions.db")); 
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
 
            $res = $db->query("SELECT * FROM exports"); 
            while($row = $res->fetchObject()){ 
                Stripper::pack($row->dtmX, $row->dtmY, $row->dtmZ); 
            } 
        } 
        catch(Exception $e){ 
            $this->_msg('Error: ' . $e->getMessage()); 
        } 
    } 
} 
$ga = new GArtefacts(); 
$ga->render();
```

Use any **[our available modes](../Modes)** and ~feel~free~ ...


# What's exists for work without plugins ?

*In some cases*, any extending of Visual Studio may be not suitable or not comfortable for some reasons (for example, your some box solution etc.)

As variant (if it's really needed), you can try other our solution - [Variant 2: Targets & Map of projects](http://stackoverflow.com/a/18311007)

Complete script of this solution you can find [here](https://gist.github.com/3F/a77129e3978841241927)


# References

* [Available Events](../Events)
* [Processing modes](../Modes)
* [Automatic Version Numbering](../Examples/Version number)
* [Artefacts. How to prepare as you want](../Examples/Artefacts)
* [Exclude projects from build on Pre-Build event](Exclude projects)
* [Confirmation dialog](Confirmation dialog)
* [Actions for specific configuration](Actions for specific configuration)
* [MSBuild](../Scripts_&_Commands/MSBuild)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* [Examples & Features](../Examples)