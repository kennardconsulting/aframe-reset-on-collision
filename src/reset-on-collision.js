(function() {

	var collideWithBoundingBox = new THREE.Box3();
	
	/**
	 * Resets an entity's position to the 'last known good' position after any simple AABB
	 * collision. Will only work for axis-aligned entities (such as walls).
	 * <p>
	 * Author: @kennardconsulting
	 */
	 
	AFRAME.registerComponent( 'reset-on-collision', {
		schema: {
			// Selector to collide with
			with: {default: '.wall'}
		},
	
		init: function() {
			// Choose a geometry size that is small enough to not get stuck often, but large enough to catch WASD movement
			
			this.el.setAttribute( 'geometry', 'width: 0.5; depth: 0.5; height: 0.5' );
			 
			this.mesh = this.el.getObject3D( 'mesh' );
			this.boundingBox = new THREE.Box3();
			this.collideWiths = this.el.sceneEl.querySelectorAll( this.data.with );
			
			this.lastKnownGoodPosition = {
				x: this.el.object3D.position.x,
				y: this.el.object3D.position.y,
				z: this.el.object3D.position.z
			}			
		},
	
		/**
		 * On every tick, check for collision. If found, reset to last known good position.
		 */
		 
		tick: function () {
	
			this.boundingBox.setFromObject( this.mesh );
			var thisMin = this.boundingBox.min;
			var thisMax = this.boundingBox.max;
	
			var self = this;
	
			if ( intersects() ) {
				this.el.setAttribute( 'position', this.lastKnownGoodPosition );
			} else {
				this.lastKnownGoodPosition = {
					x: this.el.object3D.position.x,
					y: this.el.object3D.position.y,
					z: this.el.object3D.position.z
				}
			}
	
			/**
			 * Tests each collideWiths for intersection.
			 */
			 
			function intersects() {
	
				for ( var loop = 0; loop < self.collideWiths.length; loop++) {
					var collideWith = self.collideWiths[loop];
	
					if ( intersect( collideWith )) {
						return true;
					}
				}
				return false;
			}
			
			/**
			 * Tests a single entity for intersection. Uses simple AABB collision detection.
			 */
			 
			function intersect( el ) {
			
				collideWithBoundingBox.setFromObject( el.getObject3D( 'mesh' ));
				var collideWithMin = collideWithBoundingBox.min;
				var collideWithMax = collideWithBoundingBox.max;
				return (thisMin.x <= collideWithMax.x && thisMax.x >= collideWithMin.x) &&
					   (thisMin.y <= collideWithMax.y && thisMax.y >= collideWithMin.y) &&
					   (thisMin.z <= collideWithMax.z && thisMax.z >= collideWithMin.z);
			}
		}
	} );
})();
