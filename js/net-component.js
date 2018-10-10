/* globals AFRAME, THREE, Float32Array, isEqualVec3, Color */

AFRAME.registerComponent('layer', {
    schema: {
    start: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    end: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    color: {type: 'color', default: '#74BEC1'},
    opacity: {type: 'number', default: 1},
    visible: {default: true},
    showGrid: {default: true},
    boundaries: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
  },

  multiple: true,

  init: function () {
    var data = this.data;
    var geometry;
    var material;
    material = this.material = new THREE.LineBasicMaterial({
      color: data.color,
      opacity: data.opacity,
      transparent: data.opacity < 1,
      visible: data.visible
    });
    geometry = this.geometry = new THREE.BoxGeometry( data.boundaries.x, data.boundaries.y, data.boundaries.z);
    var geo = new THREE.EdgesGeometry( geometry );
    this.line = new THREE.Line(geometry, material);
    
    this.boundary = new THREE.LineSegments(geo, material );
    // this.boundary = new THREE.Line( geometry, material );
    // this.el.setObject3D(this.attrName, this.line);
    this.el.setObject3D(this.attrName, this.boundary );
    
    var newGrid = document.createElement('a-entity');
    newGrid.setAttribute('grid', {
                          size: data.boundaries.x,
                          divisions: data.boundaries.x,
                          moveDistance: data.boundaries.z
    });
    
    if (data.showGrid){
      newGrid.setAttribute('position', {x: 0, y: 0, z: data.boundaries.z/2});
      this.el.appendChild(newGrid);
      
      var textDepth = document.createElement('a-entity');
      textDepth.setAttribute('text', {
                            value: data.boundaries.z,
                            align:"center",
                            color: "white"
      });
      textDepth.setAttribute('scale', {x: 100, y: 100, z: 100} );
      textDepth.setAttribute('position', {x: data.boundaries.x/2, y: -1*data.boundaries.y/2, z: 0});
      textDepth.setAttribute('billboard', "");
      this.el.appendChild(textDepth);

      var textWidth = document.createElement('a-entity');
      textWidth.setAttribute('text', {
                            value: data.boundaries.x,
                            align:"center",
                            color: "white"
      });
      textWidth.setAttribute('scale', {x: 100, y: 100, z: 100} );
      textWidth.setAttribute('position', {x: 0, y: -1*data.boundaries.y/2, z: data.boundaries.z/2});
      textWidth.setAttribute('billboard', "");
      this.el.appendChild(textWidth);

      var textHeight = document.createElement('a-entity');
      textHeight.setAttribute('text', {
                            value: data.boundaries.y,
                            align:"center",
                            color: "white"
      });
      textHeight.setAttribute('scale', {x: 100, y: 100, z: 100} );
      textHeight.setAttribute('position', {x: data.boundaries.x/2, y: 0, z: data.boundaries.z/2});
      textHeight.setAttribute('billboard', "");
      this.el.appendChild(textHeight);
    }
    
    
   
  },


});

AFRAME.registerComponent('convolution', {
    schema: {
    start: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    end: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    color: {type: 'color', default: '#74BEC1'},
    opacity: {type: 'number', default: 1},
    visible: {default: true},
    showGrid: {default: true},
    boundaries: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
  },

  multiple: true,

  init: function () {
    var data = this.data;
    var geometry;
    var material;
    material = this.material = new THREE.LineBasicMaterial({
      color: data.color,
      opacity: data.opacity,
      transparent: data.opacity < 1,
      visible: data.visible
    });
    geometry = this.geometry = new THREE.BoxGeometry( data.boundaries.x, data.boundaries.y, data.boundaries.z);
    var geo = new THREE.EdgesGeometry( geometry );
    this.line = new THREE.Line(geometry, material);
    
    this.boundary = new THREE.LineSegments(geo, material );
    // this.boundary = new THREE.Line( geometry, material );
    // this.el.setObject3D(this.attrName, this.line);
    this.el.setObject3D(this.attrName, this.boundary );
    
    var newGrid = document.createElement('a-entity');
    newGrid.setAttribute('grid', {
                          size: data.boundaries.x,
                          divisions: data.boundaries.x,
                          moveDistance: data.boundaries.z
    });
    
    if (data.showGrid){
      newGrid.setAttribute('position', {x: 0, y: 0, z: data.boundaries.z/2});
      this.el.appendChild(newGrid);
      
      var textDepth = document.createElement('a-entity');
      textDepth.setAttribute('text', {
                            value: data.boundaries.z,
                            align:"center",
                            color: "white"
      });
      textDepth.setAttribute('scale', {x: 100, y: 100, z: 100} );
      textDepth.setAttribute('position', {x: data.boundaries.x/2, y: -1*data.boundaries.y/2, z: 0});
      textDepth.setAttribute('billboard', "");
      this.el.appendChild(textDepth);

      var textWidth = document.createElement('a-entity');
      textWidth.setAttribute('text', {
                            value: data.boundaries.x,
                            align:"center",
                            color: "white"
      });
      textWidth.setAttribute('scale', {x: 100, y: 100, z: 100} );
      textWidth.setAttribute('position', {x: 0, y: -1*data.boundaries.y/2, z: data.boundaries.z/2});
      textWidth.setAttribute('billboard', "");
      this.el.appendChild(textWidth);

      var textHeight = document.createElement('a-entity');
      textHeight.setAttribute('text', {
                            value: data.boundaries.y,
                            align:"center",
                            color: "white"
      });
      textHeight.setAttribute('scale', {x: 100, y: 100, z: 100} );
      textHeight.setAttribute('position', {x: data.boundaries.x/2, y: 0, z: data.boundaries.z/2});
      textHeight.setAttribute('billboard', "");
      this.el.appendChild(textHeight);
    }
    
    
   
  },


});



AFRAME.registerComponent('grid', {
    schema: {
    size: {type: 'number', default: 10},
    divisions: {type: 'number', default: 10},
    moveDistance: {type: 'number', default: 0},
    
  },

  multiple: true,
  init: function () {
    
    var gridHelper = new THREE.GridHelper( this.data.size, this.data.divisions );
    gridHelper.geometry.rotateX( Math.PI / 2 );
    this.el.setObject3D(this.attrName, gridHelper );
    
    this.el.setAttribute('animation', {
                          property: "position",
                          dir: "alternate",
                          dur: this.data.moveDistance * 20,
                          easing: "easeInOutCubic",
                          loop: true,
                          delay: Math.random() * 4000,
                          to: {x: 0, y: 0, z: this.el.object3D.position.z-this.data.moveDistance}
    });
  },
  
  

});




AFRAME.registerComponent('followline', {
    schema: {
    startobj: {type: 'string', default: ''},
    endobj: {type: 'string', default: ''},
    color: {type: 'color', default: '#f4b342'},
    
  },

  multiple: true,
  init: function () {

    
    var movingObjectStart = document.querySelector(this.data.startobj);
    // this.el.setObject3D('startpoint', movingObjectStart.object3D);
    var movingObjectEnd = document.querySelector(this.data.endobj);
    // this.el.setObject3D('endpoint', movingObjectEnd.object3D);
    
//     var geometryline = new THREE.Geometry();
//     geometryline.vertices.push(
//       new THREE.Vector3( 0, 2 , 0 ),
//       new THREE.Vector3( 0, 0, 0)
//     );
    
//     // var materialline = new THREE.LineBasicMaterial({
//     //   color: this.data.color
//     // });
//     var materialline = new THREE.LineDashedMaterial( {
//       color: this.data.color,
//       // linewidth: 1,
//       // scale: 1,
//       // dashSize: 3,
//       gapSize: 0.5,
//     } );
    
//     var linenew = new THREE.Line( geometryline, materialline );
//     this.el.setObject3D('newline', linenew);
    
  },
  
  // Todo: optimize tick to not allocate new objects (https://aframe.io/docs/0.8.0/introduction/best-practices.html#tick-handlers
  tick: function () {

    // var startpointposition = this.el.getObject3D('startpoint').position;
    // var endpointposition = this.el.getObject3D('endpoint').position;
    
    // var movingObjectStart = document.querySelector(this.data.startobj);
    // var movingObjectEnd = document.querySelector(this.data.endobj);
    
    var startpointposition = document.querySelector(this.data.startobj).object3D.getWorldPosition();
    var endpointposition = document.querySelector(this.data.endobj).object3D.getWorldPosition();

    var geometryline = new THREE.Geometry();
    
    geometryline.vertices.push(
      new THREE.Vector3( startpointposition.x, startpointposition.y, startpointposition.z),
      new THREE.Vector3( endpointposition.x, endpointposition.y, endpointposition.z)
    );
    
    // var materialline = new THREE.LineBasicMaterial({
    //   color: this.data.color
    // });
    var materialline = new THREE.LineDashedMaterial( {
      color: this.data.color,
      // linewidth: 1,
      // scale: 1,
      dashSize: 0.01,
      gapSize: 0.005,
    } );

    var linenew = new THREE.Line( geometryline, materialline );
    linenew.computeLineDistances();
    
    this.el.setObject3D('newline', linenew);


  }
  
  

});














AFRAME.registerComponent('net', {
    schema: {
    start: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    end: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    color: {type: 'color', default: '#74BEC1'},
    opacity: {type: 'number', default: 1},
    visible: {default: true},
    boundaries: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    spacing: {type: 'number', default: 40},
  },

  multiple: true,
  
  

  init: function () {
    
    this.layerColor = '#4CC3D9';
    this.convColor = '#f4b342';
    this.fullConnectColor = 'green';
    this.currentPosition = {x: 0, y: 0, z: 0};
    // console.log(this.currentPosition);
    
    var imageScaleDown = 3;

    this.addLayer({x: 11, y: 11, z: 3}, 'conv', false, 0, false);
    this.addLayer({x: 277/imageScaleDown, y: 277/imageScaleDown, z: 1}, 'red', true, 1, false);
    this.addLayer({x: 277/imageScaleDown, y: 277/imageScaleDown, z: 1}, 'green', true, 1, false);
    this.addLayer({x: 277/imageScaleDown, y: 277/imageScaleDown, z: 1}, 'blue', true, this.data.spacing, false);
    
    
    this.addLayer({x: 55, y: 55, z: 96});
    this.addLayer({x: 5, y: 5, z: 96}, 'conv', true, this.data.spacing, false);
    
    this.addLayer({x: 27, y: 27, z: 256});
    this.addLayer({x: 3, y: 3, z: 256}, 'conv', true, this.data.spacing, false);
    
    this.addLayer({x: 13, y: 13, z: 384});
    this.addLayer({x: 3, y: 3, z: 384}, 'conv', true, this.data.spacing, false);
    
    this.addLayer({x: 13, y: 13, z: 384});
    this.addLayer({x: 3, y: 3, z: 384}, 'conv', true, this.data.spacing, false);
    
    this.addLayer({x: 1, y: 4096, z: 1}, 'full_connect', true, this.data.spacing, false);
    
    this.addLayer({x: 1, y: 4096, z: 1}, 'full_connect', true, this.data.spacing, false);
    
    this.addLayer({x: 1, y: 1000, z: 1}, 'full_connect', true, this.data.spacing, false);
    
    //     var bbox = new THREE.Box3().setFromObject(this.el.object3D);
    //     console.log(bbox);
  },
  
  addLayer: function (layerSize, type='tensor', updateSpacing=false, spacing=this.data.spacing, showGrid=true) {
    
    var typeColor = type;
    if (type == "tensor"){
      typeColor = this.layerColor;
    }
    if (type == "conv"){
      typeColor = this.convColor;
    }
    if (type == "full_connect"){
      typeColor = this.fullConnectColor;
      layerSize.y = 0.1 * layerSize.y;
    }
    
    // console.log(this.currentPosition);
    var temp = new THREE.Vector3( this.currentPosition.x, this.currentPosition.y, this.currentPosition.z - layerSize.z/2);
    
    var newLayer = document.createElement('a-entity');
    newLayer.setAttribute('layer', {
                          boundaries: layerSize,
                          color: typeColor,
                          showGrid: showGrid
    });
    newLayer.setAttribute('position', temp);
    
    
    this.el.appendChild(newLayer);
    // console.log(layerSize.z);
    if(updateSpacing){
      // this.currentPosition = temp;
      this.currentPosition.z += -1*(layerSize.z + spacing);
      // console.log(this.currentPosition.z);
    }
    
  }


});