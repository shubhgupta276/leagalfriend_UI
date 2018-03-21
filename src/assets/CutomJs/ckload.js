
var myExtObject = (function() {
  return {
      setEditorValue: function(value) {
      //destroying all the instances of CKeditor and then setting the value
      //other wise the ckeditor is making list of instances of editor and if the same name exists 
      // it is not able to replace the textarea with editor
        for(name in CKEDITOR.instances)
          {
          CKEDITOR.instances[name].destroy();
          }
          CKEDITOR.replace('editor2');
          //destroy is done at set editor because updation is not possible without this.
          CKEDITOR.instances.editor2.setData(value);
  },

  getEditorValue: function(value) {
    var htmlValue = CKEDITOR.instances.editor2.getData();

    return htmlValue;
}

    }
  
  })(myExtObject||{})

  var webGlObject = (function() { 
    return { 
      init: function() { 
        alert('webGlObject initialized');
      } 
    } 
  })(webGlObject||{})

 
  function submitaftersetdata() {
    this.updateElement();
}



  