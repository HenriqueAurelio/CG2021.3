
class Cybertruck {
	constructor() {

		
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
