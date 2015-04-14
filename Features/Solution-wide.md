# Solution-wide Build Events

Any actions for Pre-Build / Post-Build event **can be for all projects at once**. (You should remember this for work with [MSBuild](../Scripts_&_Commands/MSBuild))

[![scripts for all projects at once](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/obsolete/vbs_ext.jpg)](Confirmation dialog)

You can use as a [Simple caller - with your external logic](Confirmation dialog) or use the [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) or [DTE-Commands](../Scripts_&_Commands/DTE-Commands) or similar internal scripts with any interpreter such as php, python, PowerShell, Wscript, Node.js, etc.

for example: notification - send email before/after building of all projects:

```
#!php

mail('yourmail@example.com', 'Build completed', date('H:i:s'));
```

and something else

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

**or** use any [other available action type ...](../Home)

# References

* [Automatic Version Numbering](../Examples/Version number)
* [Artefacts. How to prepare as you want](../Examples/Artefacts)
* [Exclude projects from build on Pre-Build event](Exclude projects)
* [Confirmation dialog](Confirmation dialog)
* [Actions for specific configuration](Actions for specific configuration)
* [MSBuild](../Scripts_&_Commands/MSBuild)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* [Examples & Features](../Examples)