<!doctype html>
<html>
  <head>
    <meta charset=utf8>
    <title>Test-driven selecting</title>
    <script type="text/javascript" src="https://gc.kis.v2.scr.kaspersky-labs.com/40DC3E88-F9D5-404B-9B73-2076631684AD/main.js" charset="UTF-8"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  </head>
  <body>
    <h1>True Facts About Hedgehogs</h1>
    
    <main class="facts">
      
      <section class="intro">
        The hedgehog is one of the world's most dangerous predators. Famed throughout <span data-x class="continent">Antarctica</span>, where it lives, for its ravenous nature and bright <span class="purple">purple</span> coloring, few have seen a hedgehog in the flesh. The following statements may help you avoid it while traveling.
      </section>
      
      <section id="warnings">
        <ul>
          
          <li class="severe"> The hedgehog's <span data-x>cry</span> sounds eerily similar to the hook from Public Enemy's <i>Welcome to the Terrordome</i>
          <li class="mild"> Like the walrus, hedgehogs lay eggs in clutches of 12 at a time.
          
          <li class="severe"> You may be able to lure a hedgehog away from children with a platter of guacamole, its favorite meal.
          
          <li class="severe"> Remember, hedgehogs travel in packs. Where you see one, assume there are others.
          
        </ul>
      </section>
      
    </main>
  
    <ul class="test-results">
      <li data-test="tag"> tag
      <li data-test="class"> class
      <li data-test="id"> id
      <li data-test="down"> descendant
      <li data-test="up"> ancestor
      <li data-test="attr"> attr
      <li data-test="css"> css
      <li data-test="html"> html
      <li data-test="addClass"> +class
      <li data-test="removeClass"> -class
    </ul>  

    <script>
/*
YOUR CODE GOES HERE: complete the following items, using the variables provided, to make the tests pass.
*/
//1. Find all span tags on the page, and store the result in the variable below
var spans = "span";
//2. Find all tags with a class of "severe" and store the result
var severe = ".severe";
//3. Find the element with an id of "warnings"
var warnings = "#warnings";
//4. Find the <li> tags located inside of the element with ID of "warnings"
var warningItems = "#warnings li";
//5. Find the <ul> tag that contains an element with a class of "mild"
var ul = "ul:has(.mild)";
//6. Find all spans with a "data-x" attribute
var dataX = "[data-x]";
//7. Change the elements with a class of "purple" to have a background of "magenta"
$(".purple").css("background-color", "magenta");
//8. Change the contents of the element with class "continent" to contain "Australia"
$(".continent").text("Australia");
//9. Add a class of "stripe" to all odd-numbered list items inside section tags
$("section li:odd").addClass("stripe");
//10. Remove the class of "facts" from the <main> element
$("main").removeClass("facts");

</script>

    <style>
body {
  margin: auto;
  max-width: 400px;
  font-family: sans-serif;
}    
    
.test-results {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #444;
  color: white;
  box-shadow: 4px 4px rgba(0, 0, 0, .3);
  padding: 4px;
  margin: 0;
}
.test-results li {
  position: relative;
  width: 100%;
  display: block;
  list-style-type: none;
  padding-right: 24px;
}
.test-results [pass]::after, .test-results [fail]::after {
  padding: 0 4px;
  border-radius: 4px;
  position: absolute;
  right: 20px;
}
.test-results [pass]::after {
  content: "ok";
  color: white;
  background: darkolivegreen;
}
.test-results [fail]::after {
  content: "X";
  color: white;
  background: firebrick;
}
    </style>
<script>
// NO PEEKING
  $(document).ready(function(){var a=$(".test-results li");ak=[{a:spans,b:$("span")},{a:severe,b:$(".severe")},{a:warnings,b:$("#warnings")},{a:warningItems,b:$("#warnings li")},{a:ul,b:$("ul:has(.mild)")},{a:dataX,b:$("span[data-x]")},{a:"rgb(255, 0, 255)",b:$(".purple").css("background-color")},{a:"Australia",b:$(".continent").text()},{a:$(".stripe"),b:$("section li:odd")},{a:0,b:$(".facts").length}];for(n in ak)"object"==typeof ak[n].b?ak[n].b.is(ak[n].a)?a[n].setAttribute("pass","false"):a[n].setAttribute("fail","true"):ak[n].b==ak[n].a?a[n].setAttribute("pass","false"):a[n].setAttribute("fail","true")});
</script>  </body>
</html>