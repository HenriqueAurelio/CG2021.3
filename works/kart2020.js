function main() {
    var scene = new THREE.Scene(); // Create main scene
    var stats = initStats(); // To show FPS information
    var renderer = initRenderer(); // View function in util/utils
    renderer.setClearColor("rgb(30, 30, 40)");
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, -40); //posicao inicial da camera em relacao ao kart
    camera.up.set(0, 1, 0);

    //var clock = new THREE.Clock();
    // var light = initDefaultLighting(scene, new THREE.Vector3(15, 17, 20)); // Use default light

    var light = new THREE.AmbientLight(0x404040, 3.5);
    scene.add(light);

    // Listen window size changes
    window.addEventListener('resize', function() { onWindowResize(camera, renderer) }, false);

    var planeGeometry = new THREE.PlaneGeometry(10000, 10000, 200, 200);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: "rgba(20, 30, 110)",
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(degreesToRadians(-90));
    scene.add(plane);

    var wireframe = new THREE.WireframeGeometry(planeGeometry);
    var line = new THREE.LineSegments(wireframe);
    line.material.color.setStyle("rgb(180, 180, 180)");
    line.rotateX(degreesToRadians(-90));
    scene.add(line);

    // Show text information onscreen
    showInformation();

    // To use the keyboard
    var keyboard = new KeyboardState();

    var acc = 0;
    var speed = 0;
    var maxSpeed = 5;

    // Enable mouse rotation, pan, zoom etc.
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

    //-------------------------------------------------------------------
    // Start setting the group

    group = new THREE.Group();

    // Show axes (parameter is size of each axis)
    var axesHelper = new THREE.AxesHelper(12);

    // criando as partes do carro
    var body = createCube(6, 10, 1, 0); //largura-comprimento-altura
    body.rotateX(degreesToRadians(90));
    body.position.set(0.0, -1, 0)

    var aerofolio = createCube(6, 2, 1, "rgb(179, 232, 130)"); //largura-comprimento-altura
    aerofolio.rotateX(degreesToRadians(90));
    aerofolio.position.set(0.0, -1, 7)

    var aerofolioEixo = createCube(2, 1, 1, "#47e1d4"); //largura-comprimento-altura
    aerofolioEixo.rotateX(degreesToRadians(90));
    aerofolioEixo.position.set(0.0, -1, 5.5)

    var asaSuporte = createCube(0.5, 1, 2, "#47e1d4"); //largura-comprimento-altura
    asaSuporte.rotateX(degreesToRadians(90));
    asaSuporte.position.set(0.0, 0.5, -4.5)


    var asa = createCube(6, 1, 0.3, "#8747e1"); //largura-comprimento-altura
    asa.rotateX(degreesToRadians(90));
    asa.position.set(0.0, 1.65, -4.5)

    var bancoEnconsto = createCube(3, 0.3, 1, "rgb(255,0,0)"); //largura-comprimento-altura
    bancoEnconsto.rotateX(degreesToRadians(90));
    bancoEnconsto.position.set(-0.0, 0.3, -1.35)

    var bancoAcento = createCube(3, 3, 0.3, "rgb(255,0,0)"); //largura-comprimento-altura
    bancoAcento.rotateX(degreesToRadians(90));
    bancoAcento.position.set(0.0, -0.35, 0)

    var axis1 = createCylinder(0.3, 0.3, 7.0, 10, 10, false);
    axis1.rotateZ(degreesToRadians(90));
    axis1.position.set(0.0, -1.0, 4.0);

    var axis2 = createCylinder(0.3, 0.3, 7.0, 10, 10, false);
    axis2.rotateZ(degreesToRadians(90));
    axis2.position.set(0.0, -1.0, -4.0);

    var roda1 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
    roda1.position.set(3.5, -1.0, 4.0);

    var roda2 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
    roda2.position.set(-3.5, -1.0, 4.0);

    var roda3 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
    roda3.position.set(3.5, -1.0, -4.0);

    var roda4 = createTorus(1.0, 0.3, 20, 20, Math.PI * 2);
    roda4.position.set(-3.5, -1.0, -4.0);

    // juntando as partes do kart em um "grupo de objetos"
    group.add(axesHelper);
    group.add(body);
    group.add(asaSuporte);
    group.add(asa);



    group.add(aerofolio);
    group.add(aerofolioEixo);


    group.add(bancoAcento);
    group.add(bancoEnconsto);
    group.add(axis1);
    group.add(axis2);
    group.add(roda1);
    group.add(roda2);
    group.add(roda3);
    group.add(roda4);

    group.add(camera);

    //adicionando o "grupo" à cena e colocando o carro em cima do plano
    scene.add(group);
    group.translateY(2.3);

    camera.lookAt(group.position);

    render();

    function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, color) {
        var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
        var material;
        if (!color)
            material = new THREE.MeshPhongMaterial({ color: "rgb(255,0,0)" });
        else
            material = new THREE.MeshPhongMaterial({ color: "rgb(230,120,50)" });
        var object = new THREE.Mesh(geometry, material);
        object.castShadow = true;
        return object;
    }

    function createCube(largura, comprimento, altura, cor) {
        var geometry = new THREE.BoxGeometry(largura, comprimento, altura);
        var material;
        if (cor)
            material = new THREE.MeshPhongMaterial({ color: cor });
        else
            material = new THREE.MeshPhongMaterial({ color: "rgb(230,120,50)" });
        var object = new THREE.Mesh(geometry, material);
        object.castShadow = true;
        return object;
    }

    function createTorus(radius, tube, radialSegments, tubularSegments, arc) {
        var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
        var material = new THREE.MeshPhongMaterial({ color: "rgb(64, 64, 64)" });
        var object = new THREE.Mesh(geometry, material);
        object.castShadow = true;
        object.rotateY(degreesToRadians(90));
        return object;
    }

    //var camMode = 0;

    var angle = degreesToRadians(5);
    //var rotacaoRoda = 0;

    // var rotateInitRoda1 = roda1.rotation.y;
    // var rotatatio = roda2.rotation;
    // console.log(roda1.rotation.y);
    function keyboardUpdate() {
        keyboard.update();
        if (keyboard.pressed("A")) axesHelper.visible = !axesHelper.visible;

        if (keyboard.pressed("up") && acc < 1) acc += 0.05; //group.translateZ(1);
        if (keyboard.pressed("down") && acc > -1) acc -= 0.04; //group.translateZ(-1);
        if (speed >= 0 && speed <= maxSpeed) {
            if (!(speed == 0 && acc < 0) && !(speed == maxSpeed && acc > 0)) speed += acc;
            if (speed < 0) speed = 0;
            if (speed > maxSpeed) speed = maxSpeed;


        }
        acc -= 0.02;
        group.translateZ(speed);



        if (keyboard.pressed("left")) {
            if(speed > 0) group.rotateY(angle);
            // roda1.rotateY(angle);
            // roda2.rotateY(angle);
        }
        if (keyboard.pressed("right")) {
            if(speed > 0) group.rotateY(-angle);
            // roda1.rotateY(-angle);
            // roda2.rotateY(-angle);
        }
    }

    function cameraUpdate() {
        camera.lookAt(group.position);

    }

    function showInformation() {
        // Use this to show information onscreen
        controls = new InfoBox();
        controls.add("Kart");
        controls.addParagraph();
        controls.add("Up arrow to accelerate");
        controls.add("Down arrow to accelerate");
        controls.add("Left / Right arrow to turn");
        controls.add("Press 'A' to show/hide axes");
        controls.show();
    }

    function render() {
        stats.update(); // Update FPS
        trackballControls.update();
        keyboardUpdate();
        cameraUpdate();
        requestAnimationFrame(render); // Show events
        renderer.render(scene, camera) // Render scene
    }
}