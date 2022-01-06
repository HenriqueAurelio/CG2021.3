
class Cybertruck {
	constructor() {

		// B. Light
		let topLightVerticesArr = [
				[-0.26,0.49,0.09],
				[0.26, 0.49,0.09],
				[-0.26,0.48,0.1],
				[0.26, 0.48,0.1]
			],
			topLightVertices = topLightVerticesArr.map(toVectors),
			topLightGeo = new THREE.Geometry();

		topLightGeo.vertices = topLightVertices;

		let topLight = new THREE.Mesh(topLightGeo,lightMat);
		this.mesh.add(topLight);

		// IV. Front Lights
		// A. Upper
		let frontLightVerticesArr = [
				[-0.45,  0.075,0.4701],
				[-0.33,  0.04, 0.4999],
				[0.33,   0.04, 0.4999],
				[0.45,   0.075,0.4701],

				[-0.45,  0.043,0.4685],
				[-0.3315,0.02, 0.4985],
				[0.3315, 0.02, 0.4985],
				[0.45,   0.043,0.4685]
			],
			frontLightVertices = frontLightVerticesArr.map(toVectors),
			frontLightGeo = new THREE.Geometry();

		frontLightGeo.vertices = frontLightVertices;

		let frontLight = new THREE.Mesh(frontLightGeo,lightMat);
		this.mesh.add(frontLight);

		// B. Lower
		let lowerLightMat = new THREE.MeshBasicMaterial({
				color: 0xff9e59,
				wireframe: this.wireframes
			}),
			lowerLFrontLightVerticesArr = [
				[0.343,-0.13,0.4881],
				[0.45, -0.13,0.4601],
				[0.343,-0.12,0.4885],
				[0.45, -0.12,0.4605]
			],
			lowerLFrontLightVertices = lowerLFrontLightVerticesArr.map(toVectors),
			lowerLFrontLightGeo = new THREE.Geometry();

		// left
		lowerLFrontLightGeo.vertices = lowerLFrontLightVertices;
		let lowerLFrontLight = new THREE.Mesh(lowerLFrontLightGeo,lowerLightMat);
		this.mesh.add(lowerLFrontLight);

		// right
		let lowerRFrontLightVerticesArr = lowerLFrontLightVerticesArr.map(flipXVertices),
			lowerRFrontLightVertices = lowerRFrontLightVerticesArr.map(toVectors),
			lowerRFrontLightGeo = new THREE.Geometry();

		lowerRFrontLightGeo.vertices = lowerRFrontLightVertices;
		lowerRFrontLightGeo.computeFaceNormals();

		let lowerRFrontLight = new THREE.Mesh(lowerRFrontLightGeo,lowerLightMat);
		this.mesh.add(lowerRFrontLight);

		// V. Back Light
		let backLightGeo = new THREE.PlaneGeometry(W*0.9,H*0.06),
			backLightMat = new THREE.MeshStandardMaterial({
				color: 0x101010,
				wireframe: this.wireframes
			}),
			backLight = new THREE.Mesh(backLightGeo,backLightMat);

		backLightGeo.translate(0,H*0.03,0);
		backLight.position.set(0,H*0.26,D*-0.5);
		backLight.rotation.set(171 * Math.PI/180,0,0);

		// red part
		let backLightInnerGeo = new THREE.PlaneGeometry(W*0.9 - H*0.04, H*0.02),
			backLightInnerMat = new THREE.MeshBasicMaterial({
				color: 0xd65a65,
				wireframe: this.wireframes
			}),
			backLightInner = new THREE.Mesh(backLightInnerGeo,backLightInnerMat);

		backLightInnerGeo.translate(0,H*0.03,0);
		backLightInner.position.set(0,0,0.01);
		backLight.add(backLightInner);

		let backLightAreaGeo = new THREE.PlaneGeometry(W*0.18, H*0.02),
			backLightAreaMat = new THREE.MeshBasicMaterial({
				color: 0xfdffb8,
				wireframe: this.wireframes
			}),
			backLightArea2 = new THREE.Mesh(backLightAreaGeo,backLightAreaMat);

		// middle light
		backLightAreaGeo.translate(0,H*0.03,0);
		backLightArea2.position.set(0,0,0.01);
		backLightInner.add(backLightArea2);

		// left light
		let backLightArea1 = backLightArea2.clone();
		backLightArea1.position.set(W*-0.33,0,0.01);
		backLightInner.add(backLightArea1);

		// right light
		let backLightArea3 = backLightArea2.clone();
		backLightArea3.position.set(W*0.33,0,0.01);
		backLightInner.add(backLightArea3);

		this.mesh.add(backLight);

		// VIII. Back
		// A. Connecting Bumper
		let backVerticesArr = [
				[-0.423,-0.1,  -0.47],
				[0.423, -0.1,  -0.47],
				[-0.423,-0.222,-0.47],
				[0.423, -0.222,-0.47],
				[-0.423,-0.1,  -0.38],
				[0.423, -0.1,  -0.38],
				[-0.423,-0.285,-0.4],
				[0.423, -0.285,-0.4]
			],
			backVertices = backVerticesArr.map(toVectors),
			backGeo = new THREE.Geometry(),
			backMat = new THREE.MeshStandardMaterial({
				color: 0x101010,
				wireframe: this.wireframes
			});

		backGeo.vertices = backVertices;

		let back = new THREE.Mesh(backGeo,backMat);
		this.mesh.add(back);

		// B. Red Lines
		let redLinesMat = new THREE.MeshStandardMaterial({
				color: 0xd81937,
				wireframe: this.wireframes
			}),
			leftRedLinesVerticesArr = [
				[0.356, -0.115,-0.4701],
				[0.4231,-0.115,-0.4701],
				[0.4231,-0.115,-0.385],
				[0.356, -0.135,-0.4701],
				[0.4231,-0.135,-0.4701],
				[0.4231,-0.135,-0.387]
			],
			leftRedLinesVertices = leftRedLinesVerticesArr.map(toVectors),
			leftRedLinesGeo = new THREE.Geometry();

		// left
		leftRedLinesGeo.vertices = leftRedLinesVertices;

		let leftRedLines = new THREE.Mesh(leftRedLinesGeo,redLinesMat);
		this.mesh.add(leftRedLines);

		let leftSmallBackLightVerticesArr = [
				[0.4,   -0.135,-0.4702],
				[0.4231,-0.135,-0.4702],
				[0.4,   -0.115,-0.4702],
				[0.4231,-0.115,-0.4702]
			],
			leftSmallBackLightVertices = leftSmallBackLightVerticesArr.map(toVectors),
			leftSmallBackLightGeo = new THREE.Geometry();

		leftSmallBackLightGeo.vertices = leftSmallBackLightVertices;

		let leftSmallBackLight = new THREE.Mesh(leftSmallBackLightGeo,backLightInnerMat);
		this.mesh.add(leftSmallBackLight);

		// right
		let rightRedLinesVerticesArr = leftRedLinesVerticesArr.map(flipXVertices),
			rightRedLinesVertices = rightRedLinesVerticesArr.map(toVectors),
			rightRedLinesGeo = new THREE.Geometry();

		rightRedLinesGeo.vertices = rightRedLinesVertices;

		let rightRedLines = new THREE.Mesh(rightRedLinesGeo,redLinesMat);
		this.mesh.add(rightRedLines);

		let rightSmallBackLightVerticesArr = leftSmallBackLightVerticesArr.map(flipXVertices),
			rightSmallBackLightVertices = rightSmallBackLightVerticesArr.map(toVectors),
			rightSmallBackLightGeo = new THREE.Geometry();

		rightSmallBackLightGeo.vertices = rightSmallBackLightVertices;

		let rightSmallBackLight = new THREE.Mesh(rightSmallBackLightGeo,backLightInnerMat);
		this.mesh.add(rightSmallBackLight);

		// C. Bumper
		let backBumperVerticesArr = [
				[-0.452,-0.15, -0.49],
				[-0.143,-0.15, -0.49],
				[-0.415,-0.223,-0.49],
				[-0.128,-0.223,-0.49],
				[0.143, -0.15, -0.49],
				[0.452, -0.15, -0.49],
				[0.128, -0.223,-0.49],
				[0.415, -0.223,-0.49],
				[-0.208,-0.25, -0.49],
				[0.208, -0.25, -0.49],
				[-0.423,-0.286,-0.4],
				[-0.226,-0.311,-0.4],
				[0.226, -0.311,-0.4],
				[0.423, -0.286,-0.4],
				[-0.424,-0.15, -0.47],
				[-0.143,-0.15, -0.47],
				[0.143, -0.15, -0.47],
				[0.424, -0.15, -0.47],
				[-0.128,-0.223,-0.47],
				[0.128, -0.223,-0.47],
				[-0.5,  -0.15, -0.385],
				[-0.424,-0.15, -0.385],
				[0.424, -0.15, -0.385],
				[0.5,   -0.15, -0.385],
				[-0.424,-0.223,-0.47],
				[0.424, -0.223,-0.47],
				[-0.226,-0.286,-0.4],
				[0.226, -0.286,-0.4]
			],
			backBumperVertices = backBumperVerticesArr.map(toVectors),
	
			backBumperGeo = new THREE.Geometry();

		backBumperGeo.vertices = backBumperVertices;

		let backBumper = new THREE.Mesh(backBumperGeo,sideMat);
		backBumper.castShadow = true;
		this.mesh.add(backBumper);

		// IX. Front Bumper
		let frontBumperVerticesArr = [
				[-0.5,  -0.13, 0.4501],
				[0.5,   -0.13, 0.4501],
				[-0.346,-0.13, 0.495],
				[0.346, -0.13, 0.495],
				[-0.5,  -0.194,0.4501],
				[0.5,   -0.194,0.4501],
				[-0.346,-0.194,0.495],
				[0.346, -0.194,0.495],
				[-0.466,-0.242,0.4501],
				[0.466, -0.242,0.4501],
				[-0.346,-0.242,0.485],
				[0.346, -0.242,0.485],
				[-0.346,-0.31, 0.4501],
				[0.346, -0.31, 0.4501],
				[-0.346,-0.194,0.47],
				[0.346, -0.194,0.47],
				[-0.346,-0.242,0.47],
				[0.346, -0.242,0.47]
			],
			frontBumperVertices = frontBumperVerticesArr.map(toVectors),
			frontBumperGeo = new THREE.Geometry();

		frontBumperGeo.vertices = frontBumperVertices;

		let frontBumper = new THREE.Mesh(frontBumperGeo,sideMat);
		frontBumper.castShadow = true;
		this.mesh.add(frontBumper);

		// X. Front Cylinders
		let cylinderGeo = new THREE.CylinderBufferGeometry(W*0.025,W*0.025,H*0.32,32),
			cylinderMat = new THREE.MeshStandardMaterial({
				color: 0x969696,
				wireframe: this.wireframes
			}),
			leftCylinder = new THREE.Mesh(cylinderGeo,cylinderMat);
		
		// left
		leftCylinder.position.set(W*0.33,H*-0.09,D*0.355);
		leftCylinder.rotation.x = -5 *Math.PI/180;
		this.mesh.add(leftCylinder);

		// right
		let rightCylinder = leftCylinder.clone();
		rightCylinder.position.x *= -1;
		this.mesh.add(rightCylinder);

		// B. Support Parts
		let supportMat = new THREE.MeshStandardMaterial({
				color: 0x595959,
				wireframe: this.wireframes
			}),
			frontAxleSupportVerticesArr = [
				// back (0–7)
				[-0.3,  -0.31, 0.2582],
				[0.3,   -0.31, 0.2582],
				[-0.3,  -0.17, 0.265],
				[0.3,   -0.17, 0.265],
				[-0.3,  -0.31, 0.31],
				[0.3,   -0.31, 0.31],
				[-0.3,  0.04,  0.31],
				[0.3,   0.04,  0.31],
				// front (8–15)
				[-0.3,  -0.31, 0.42],
				[0.3,   -0.31, 0.42],
				[-0.3,  0.04,  0.42],
				[0.3,   0.04,  0.42],
				[-0.3,  -0.31, 0.45],
				[0.3,   -0.31, 0.45],
				[-0.3,  -0.13, 0.45],
				[0.3,   -0.13, 0.45],
				// right side (16–22)
				[-0.355,-0.31, 0.2582],
				[-0.45, -0.17, 0.265],
				[-0.45, 0.04,  0.3099],
				[-0.45, 0.04,  0.42],
				[-0.45, -0.13, 0.45],
				[-0.45, -0.13, 0.455],
				[-0.346,-0.31, 0.45],
				// left side (23-29)
				[0.355, -0.31, 0.2582],
				[0.45,  -0.17, 0.265],
				[0.45,  0.04,  0.3099],
				[0.45,  0.04,  0.42],
				[0.45,  -0.13, 0.45],
				[0.45,  -0.13, 0.455],
				[0.346, -0.31, 0.45]
			],
			frontAxleSupportVertices = frontAxleSupportVerticesArr.map(toVectors),
			frontAxleSupportGeo = new THREE.Geometry();

		frontAxleSupportGeo.vertices = frontAxleSupportVertices;


		let frontAxleSupport = new THREE.Mesh(frontAxleSupportGeo,supportMat);
		frontAxleSupport.castShadow = true;
		this.mesh.add(frontAxleSupport);

		let backAxleSupportVerticesArr = [
				// back (0–7)
				[-0.3,  -0.29, -0.3999],
				[0.3,   -0.29, -0.3999],
				[-0.3,  -0.1,  -0.38],
				[0.3,   -0.1,  -0.38],
				[-0.3,  -0.31, -0.35],
				[0.3,   -0.31, -0.35],
				[-0.3,  0.04,  -0.35],
				[0.3,   0.04,  -0.35],
				// front (8–15)
				[-0.3,  -0.31, -0.24],
				[0.3,   -0.31, -0.24],
				[-0.3,  0.04,  -0.24],
				[0.3,   0.04,  -0.24],
				[-0.3,  -0.29, -0.19],
				[0.3,   -0.29, -0.19],
				[-0.3,  -0.15, -0.19],
				[0.3,   -0.15, -0.19],
				// right side (16–22)
				[-0.423,-0.285,-0.3999],
				[-0.423,-0.1,  -0.3799],
				[-0.45, 0.04,  -0.3501],
				[-0.45, 0.04,  -0.24],
				[-0.45, -0.15, -0.19],
				[-0.45, -0.15, -0.197],
				[-0.355,-0.29, -0.19],
				// left side (23-29)
				[0.423, -0.285,-0.3999],
				[0.423, -0.1,  -0.3799],
				[0.45,  0.04,  -0.3501],
				[0.45,  0.04,  -0.24],
				[0.45,  -0.15, -0.19],
				[0.45,  -0.15, -0.197],
				[0.355, -0.29, -0.19]
			],
			backAxleSupportVertices = backAxleSupportVerticesArr.map(toVectors),
			backAxleSupportGeo = new THREE.Geometry();

		backAxleSupportGeo.vertices = backAxleSupportVertices;

		let backAxleSupport = new THREE.Mesh(backAxleSupportGeo,supportMat);
		backAxleSupport.castShadow = true;
		this.mesh.add(backAxleSupport);

		// C. Bottom Plane Between
		let bottomVerticesArr = [
				[-0.355,-0.29,-0.19],
				[-0.3,  -0.29,-0.19],
				[0.3,   -0.29,-0.19],
				[0.355, -0.29,-0.19],
				[-0.355,-0.31,0.2582],
				[-0.3,  -0.31,0.2582],
				[0.3,   -0.31,0.2582],
				[0.355, -0.31,0.2582]
			],
			bottomVertices = bottomVerticesArr.map(toVectors),
			bottomGeo = new THREE.Geometry();

		bottomGeo.vertices = bottomVertices;

		let bottom = new THREE.Mesh(bottomGeo,supportMat);
		bottom.castShadow = true;
		this.mesh.add(bottom);
			
	}

	move() {
		let fps = 60,
			scaleBy = 10,

			inchesInMile = 5280 * 12,
			incZ1MPH = (inchesInMile / 3600) / fps,
			incZ = incZ1MPH * this.speed,

			tireRadius = this.height * 0.23,
			feetPerMin = (this.speed * 5280) / 60,
			rpm = feetPerMin / (2 * Math.PI * (tireRadius / 12)),
			incRotate = (Math.PI * 2) * (rpm / 6e4) * (1e3 / fps);

		this.wheels.forEach(e => {
			e.rotation.x += incRotate / scaleBy;

			if (e.rotation.x >= Math.PI * 2)
				e.rotation.x = 0;
		});
		this.mesh.position.z += incZ / scaleBy;
	}
}
