---
layout: doc
title: Interpreter Mode
permalink: /doc/Modes/Interpreter/
---

# Interpreter Mode

This is very simple action type for work with external streaming-interpreters (that allowed running code directly as command).

For this mode you should configure used interpreter:

* Name or full path to executable file with arguments for processing your command below. 
    * For example: [`php -r`](http://php.net/manual/en/features.commandline.options.php), or [`cmd.exe /C`](https://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/cmd.mspx?mfr=true), etc.
* `treat newline as` option: It allows assign any combination of symbols instead of newline from your command below.
* `wrapper`: Use this if also requires escaping of the same characters in your command/script. 
    * If used 1 symbol, for example - `"`:
        * Will be escaped all this in your command/script and result should be as `" + command + "`
    * If used 2, for example - `()`:
        * Will be escaped for each individually (i.e. `(` and `)`) and result should be as `( + command + )`

For example, this useful for php:

```php

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
        catch(Exception $ex){ 
            $this->_msg('Error: ' . $ex->getMessage()); 
        } 
    } 
} 
$ga = new GArtefacts(); 
$ga->render();
```

Then you can use any command script as above.

**Note:**

* You can also enable [MSBuild](../../Scripts/MSBuild/) & [SBE-Scripts](../../Scripts/SBE-Scripts/) engines for construct your script at runtime before executing.

## Options

{% include elem/fillme %}

### Time limit

`How long to wait the exection, in seconds. 0 value - infinitely`

This option should terminate execution of this action for selected time.

# References

* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)