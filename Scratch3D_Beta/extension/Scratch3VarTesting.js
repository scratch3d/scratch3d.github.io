(function() {


  function DescriptorBuilder(descriptor) {
    this.descriptor = descriptor;
  }

  DescriptorBuilder.prototype.addBlock = function(type, label, op, defaultArgs) {
    if (!this.descriptor.blocks) this.descriptor.blocks = [];
    var block = [type, label, op];
    if (defaultArgs instanceof Array) for (var i = 0, l = defaultArgs.length; i < l; i++) block.push(defaultArgs[i]);
    this.descriptor.blocks.push(block);
  };

  DescriptorBuilder.prototype.addButton = function(label, action) {
    if (!this.descriptor.blocks) this.descriptor.blocks = [];
    this.descriptor.blocks.push([null, label, action]);
  };

  DescriptorBuilder.prototype.addSpace = function(height) {
    if (!this.descriptor.blocks) this.descriptor.blocks = [];
    if (height === undefined) height = 1;
    var s = '';
    for (var i = 0; i < height; i++) s += '-';
    this.descriptor.blocks.push([s]);
  };

  DescriptorBuilder.prototype.addMenu = function(name, menu) {
    if (!this.descriptor.menus) this.descriptor.menus = {};
    this.descriptor.menus[name] = menu;
  };

  var extBase = {};

  extBase._shutdown = function() {
  };

  extBase._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  extBase.reload = function(){
    console.log("reload called");
    reloadExtension();
  };

  function loadExtension() {
    var ext = Object.create(extBase),
      descriptor = {};
    var db = new DescriptorBuilder(descriptor);
    db.addButton('Make a Cookie Variable', 'reload');
   
      db.addSpace();
      db.addBlock(' ', 'set %m.cookieVar to %s', 'reloadExtension');
      db.addBlock(' ', 'change %m.cookieVar by %n', 'changeCookieVar');

      
      var cookieVarMenu = [];
      db.addMenu('cookieVar', cookieVarMenu);

    ScratchExtensions.register('Cookie Variables', descriptor, ext);
  };
  
  function reloadExtension() {
    console.log("reloadExtension called");
    ScratchExtensions.unregister('Cookie Variables');
    //loadExtension();
  }

  loadExtension();
})();