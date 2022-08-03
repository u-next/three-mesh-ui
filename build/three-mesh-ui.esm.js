/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const REVISION = '142';
const FrontSide = 0;
const BackSide = 1;
const DoubleSide = 2;
const FlatShading = 1;
const NormalBlending = 1;
const AddEquation = 100;
const SrcAlphaFactor = 204;
const OneMinusSrcAlphaFactor = 205;
const LessEqualDepth = 3;
const MultiplyOperation = 0;

const UVMapping = 300;
const RepeatWrapping = 1000;
const ClampToEdgeWrapping = 1001;
const MirroredRepeatWrapping = 1002;
const LinearFilter = 1006;
const LinearMipmapLinearFilter = 1008;
const UnsignedByteType = 1009;
const RGBAFormat = 1023;
const LinearEncoding = 3000;
const SRGBColorSpace = 'srgb';
const LinearSRGBColorSpace = 'srgb-linear';
const KeepStencilOp = 7680;
const AlwaysStencilFunc = 519;

const StaticDrawUsage = 35044;

/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */

class EventDispatcher {

	addEventListener( type, listener ) {

		if ( this._listeners === undefined ) this._listeners = {};

		const listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	}

	hasEventListener( type, listener ) {

		if ( this._listeners === undefined ) return false;

		const listeners = this._listeners;

		return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

	}

	removeEventListener( type, listener ) {

		if ( this._listeners === undefined ) return;

		const listeners = this._listeners;
		const listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			const index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	}

	dispatchEvent( event ) {

		if ( this._listeners === undefined ) return;

		const listeners = this._listeners;
		const listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

			event.target = this;

			// Make a copy, in case listeners are removed while iterating.
			const array = listenerArray.slice( 0 );

			for ( let i = 0, l = array.length; i < l; i ++ ) {

				array[ i ].call( this, event );

			}

			event.target = null;

		}

	}

}

const _lut = [ '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a', '2b', '2c', '2d', '2e', '2f', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e', '3f', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4a', '4b', '4c', '4d', '4e', '4f', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c', '5d', '5e', '5f', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a', '7b', '7c', '7d', '7e', '7f', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8a', '8b', '8c', '8d', '8e', '8f', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9a', '9b', '9c', '9d', '9e', '9f', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'da', 'db', 'dc', 'dd', 'de', 'df', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff' ];

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
function generateUUID() {

	const d0 = Math.random() * 0xffffffff | 0;
	const d1 = Math.random() * 0xffffffff | 0;
	const d2 = Math.random() * 0xffffffff | 0;
	const d3 = Math.random() * 0xffffffff | 0;
	const uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
			_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
			_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
			_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

	// .toLowerCase() here flattens concatenated strings to save heap memory space.
	return uuid.toLowerCase();

}

function clamp( value, min, max ) {

	return Math.max( min, Math.min( max, value ) );

}

// compute euclidean modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation
function euclideanModulo( n, m ) {

	return ( ( n % m ) + m ) % m;

}

// https://en.wikipedia.org/wiki/Linear_interpolation
function lerp( x, y, t ) {

	return ( 1 - t ) * x + t * y;

}

class Vector2 {

	constructor( x = 0, y = 0 ) {

		Vector2.prototype.isVector2 = true;

		this.x = x;
		this.y = y;

	}

	get width() {

		return this.x;

	}

	set width( value ) {

		this.x = value;

	}

	get height() {

		return this.y;

	}

	set height( value ) {

		this.y = value;

	}

	set( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	}

	setScalar( scalar ) {

		this.x = scalar;
		this.y = scalar;

		return this;

	}

	setX( x ) {

		this.x = x;

		return this;

	}

	setY( y ) {

		this.y = y;

		return this;

	}

	setComponent( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	clone() {

		return new this.constructor( this.x, this.y );

	}

	copy( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	}

	add( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	}

	addScalar( s ) {

		this.x += s;
		this.y += s;

		return this;

	}

	addVectors( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	}

	addScaledVector( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;

		return this;

	}

	sub( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	subScalar( s ) {

		this.x -= s;
		this.y -= s;

		return this;

	}

	subVectors( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	}

	multiply( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}

	divide( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	}

	divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}

	applyMatrix3( m ) {

		const x = this.x, y = this.y;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

		return this;

	}

	min( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );

		return this;

	}

	max( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );

		return this;

	}

	clamp( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );

		return this;

	}

	clampScalar( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

		return this;

	}

	clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	}

	ceil() {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	}

	round() {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	}

	roundToZero() {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	}

	negate() {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y;

	}

	cross( v ) {

		return this.x * v.y - this.y * v.x;

	}

	lengthSq() {

		return this.x * this.x + this.y * this.y;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	}

	manhattanLength() {

		return Math.abs( this.x ) + Math.abs( this.y );

	}

	normalize() {

		return this.divideScalar( this.length() || 1 );

	}

	angle() {

		// computes the angle in radians with respect to the positive x-axis

		const angle = Math.atan2( - this.y, - this.x ) + Math.PI;

		return angle;

	}

	distanceTo( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	}

	distanceToSquared( v ) {

		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	}

	manhattanDistanceTo( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

	}

	setLength( length ) {

		return this.normalize().multiplyScalar( length );

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;

		return this;

	}

	equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	}

	fromArray( array, offset = 0 ) {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	}

	fromBufferAttribute( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector2: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );

		return this;

	}

	rotateAround( center, angle ) {

		const c = Math.cos( angle ), s = Math.sin( angle );

		const x = this.x - center.x;
		const y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();

		return this;

	}

	*[ Symbol.iterator ]() {

		yield this.x;
		yield this.y;

	}

}

class Matrix3 {

	constructor() {

		Matrix3.prototype.isMatrix3 = true;

		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	set( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		const te = this.elements;

		te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
		te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
		te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

		return this;

	}

	identity() {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;

	}

	copy( m ) {

		const te = this.elements;
		const me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
		te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
		te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

		return this;

	}

	extractBasis( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrix3Column( this, 0 );
		yAxis.setFromMatrix3Column( this, 1 );
		zAxis.setFromMatrix3Column( this, 2 );

		return this;

	}

	setFromMatrix4( m ) {

		const me = m.elements;

		this.set(

			me[ 0 ], me[ 4 ], me[ 8 ],
			me[ 1 ], me[ 5 ], me[ 9 ],
			me[ 2 ], me[ 6 ], me[ 10 ]

		);

		return this;

	}

	multiply( m ) {

		return this.multiplyMatrices( this, m );

	}

	premultiply( m ) {

		return this.multiplyMatrices( m, this );

	}

	multiplyMatrices( a, b ) {

		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
		const a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
		const a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

		const b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
		const b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
		const b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
		te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
		te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
		te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
		te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
		te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
		te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

		return this;

	}

	multiplyScalar( s ) {

		const te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;

	}

	determinant() {

		const te = this.elements;

		const a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

	}

	invert() {

		const te = this.elements,

			n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ],
			n12 = te[ 3 ], n22 = te[ 4 ], n32 = te[ 5 ],
			n13 = te[ 6 ], n23 = te[ 7 ], n33 = te[ 8 ],

			t11 = n33 * n22 - n32 * n23,
			t12 = n32 * n13 - n33 * n12,
			t13 = n23 * n12 - n22 * n13,

			det = n11 * t11 + n21 * t12 + n31 * t13;

		if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		const detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
		te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

		te[ 3 ] = t12 * detInv;
		te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
		te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

		te[ 6 ] = t13 * detInv;
		te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
		te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

		return this;

	}

	transpose() {

		let tmp;
		const m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;

	}

	getNormalMatrix( matrix4 ) {

		return this.setFromMatrix4( matrix4 ).invert().transpose();

	}

	transposeIntoArray( r ) {

		const m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	}

	setUvTransform( tx, ty, sx, sy, rotation, cx, cy ) {

		const c = Math.cos( rotation );
		const s = Math.sin( rotation );

		this.set(
			sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
			- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
			0, 0, 1
		);

		return this;

	}

	scale( sx, sy ) {

		const te = this.elements;

		te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
		te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

		return this;

	}

	rotate( theta ) {

		const c = Math.cos( theta );
		const s = Math.sin( theta );

		const te = this.elements;

		const a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ];
		const a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ];

		te[ 0 ] = c * a11 + s * a21;
		te[ 3 ] = c * a12 + s * a22;
		te[ 6 ] = c * a13 + s * a23;

		te[ 1 ] = - s * a11 + c * a21;
		te[ 4 ] = - s * a12 + c * a22;
		te[ 7 ] = - s * a13 + c * a23;

		return this;

	}

	translate( tx, ty ) {

		const te = this.elements;

		te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
		te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

		return this;

	}

	equals( matrix ) {

		const te = this.elements;
		const me = matrix.elements;

		for ( let i = 0; i < 9; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		return true;

	}

	fromArray( array, offset = 0 ) {

		for ( let i = 0; i < 9; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}

	toArray( array = [], offset = 0 ) {

		const te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ] = te[ 8 ];

		return array;

	}

	clone() {

		return new this.constructor().fromArray( this.elements );

	}

}

function arrayNeedsUint32( array ) {

	// assumes larger values usually on last

	for ( let i = array.length - 1; i >= 0; -- i ) {

		if ( array[ i ] > 65535 ) return true;

	}

	return false;

}

function createElementNS( name ) {

	return document.createElementNS( 'http://www.w3.org/1999/xhtml', name );

}

function SRGBToLinear( c ) {

	return ( c < 0.04045 ) ? c * 0.0773993808 : Math.pow( c * 0.9478672986 + 0.0521327014, 2.4 );

}

function LinearToSRGB( c ) {

	return ( c < 0.0031308 ) ? c * 12.92 : 1.055 * ( Math.pow( c, 0.41666 ) ) - 0.055;

}

// JavaScript RGB-to-RGB transforms, defined as
// FN[InputColorSpace][OutputColorSpace] callback functions.
const FN = {
	[ SRGBColorSpace ]: { [ LinearSRGBColorSpace ]: SRGBToLinear },
	[ LinearSRGBColorSpace ]: { [ SRGBColorSpace ]: LinearToSRGB },
};

const ColorManagement = {

	legacyMode: true,

	get workingColorSpace() {

		return LinearSRGBColorSpace;

	},

	set workingColorSpace( colorSpace ) {

		console.warn( 'THREE.ColorManagement: .workingColorSpace is readonly.' );

	},

	convert: function ( color, sourceColorSpace, targetColorSpace ) {

		if ( this.legacyMode || sourceColorSpace === targetColorSpace || ! sourceColorSpace || ! targetColorSpace ) {

			return color;

		}

		if ( FN[ sourceColorSpace ] && FN[ sourceColorSpace ][ targetColorSpace ] !== undefined ) {

			const fn = FN[ sourceColorSpace ][ targetColorSpace ];

			color.r = fn( color.r );
			color.g = fn( color.g );
			color.b = fn( color.b );

			return color;

		}

		throw new Error( 'Unsupported color space conversion.' );

	},

	fromWorkingColorSpace: function ( color, targetColorSpace ) {

		return this.convert( color, this.workingColorSpace, targetColorSpace );

	},

	toWorkingColorSpace: function ( color, sourceColorSpace ) {

		return this.convert( color, sourceColorSpace, this.workingColorSpace );

	},

};

const _colorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
	'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
	'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
	'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
	'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
	'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
	'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
	'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
	'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
	'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
	'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
	'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
	'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
	'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
	'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
	'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
	'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
	'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
	'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
	'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
	'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
	'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
	'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
	'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

const _rgb = { r: 0, g: 0, b: 0 };
const _hslA = { h: 0, s: 0, l: 0 };
const _hslB = { h: 0, s: 0, l: 0 };

function hue2rgb( p, q, t ) {

	if ( t < 0 ) t += 1;
	if ( t > 1 ) t -= 1;
	if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
	if ( t < 1 / 2 ) return q;
	if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
	return p;

}

function toComponents( source, target ) {

	target.r = source.r;
	target.g = source.g;
	target.b = source.b;

	return target;

}

class Color {

	constructor( r, g, b ) {

		this.isColor = true;

		this.r = 1;
		this.g = 1;
		this.b = 1;

		if ( g === undefined && b === undefined ) {

			// r is THREE.Color, hex or string
			return this.set( r );

		}

		return this.setRGB( r, g, b );

	}

	set( value ) {

		if ( value && value.isColor ) {

			this.copy( value );

		} else if ( typeof value === 'number' ) {

			this.setHex( value );

		} else if ( typeof value === 'string' ) {

			this.setStyle( value );

		}

		return this;

	}

	setScalar( scalar ) {

		this.r = scalar;
		this.g = scalar;
		this.b = scalar;

		return this;

	}

	setHex( hex, colorSpace = SRGBColorSpace ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		ColorManagement.toWorkingColorSpace( this, colorSpace );

		return this;

	}

	setRGB( r, g, b, colorSpace = LinearSRGBColorSpace ) {

		this.r = r;
		this.g = g;
		this.b = b;

		ColorManagement.toWorkingColorSpace( this, colorSpace );

		return this;

	}

	setHSL( h, s, l, colorSpace = LinearSRGBColorSpace ) {

		// h,s,l ranges are in 0.0 - 1.0
		h = euclideanModulo( h, 1 );
		s = clamp( s, 0, 1 );
		l = clamp( l, 0, 1 );

		if ( s === 0 ) {

			this.r = this.g = this.b = l;

		} else {

			const p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			const q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		ColorManagement.toWorkingColorSpace( this, colorSpace );

		return this;

	}

	setStyle( style, colorSpace = SRGBColorSpace ) {

		function handleAlpha( string ) {

			if ( string === undefined ) return;

			if ( parseFloat( string ) < 1 ) {

				console.warn( 'THREE.Color: Alpha component of ' + style + ' will be ignored.' );

			}

		}


		let m;

		if ( m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec( style ) ) {

			// rgb / hsl

			let color;
			const name = m[ 1 ];
			const components = m[ 2 ];

			switch ( name ) {

				case 'rgb':
				case 'rgba':

					if ( color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

						// rgb(255,0,0) rgba(255,0,0,0.5)
						this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
						this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
						this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

						ColorManagement.toWorkingColorSpace( this, colorSpace );

						handleAlpha( color[ 4 ] );

						return this;

					}

					if ( color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

						// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
						this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
						this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
						this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

						ColorManagement.toWorkingColorSpace( this, colorSpace );

						handleAlpha( color[ 4 ] );

						return this;

					}

					break;

				case 'hsl':
				case 'hsla':

					if ( color = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

						// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
						const h = parseFloat( color[ 1 ] ) / 360;
						const s = parseInt( color[ 2 ], 10 ) / 100;
						const l = parseInt( color[ 3 ], 10 ) / 100;

						handleAlpha( color[ 4 ] );

						return this.setHSL( h, s, l, colorSpace );

					}

					break;

			}

		} else if ( m = /^\#([A-Fa-f\d]+)$/.exec( style ) ) {

			// hex color

			const hex = m[ 1 ];
			const size = hex.length;

			if ( size === 3 ) {

				// #ff0
				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255;
				this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255;
				this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255;

				ColorManagement.toWorkingColorSpace( this, colorSpace );

				return this;

			} else if ( size === 6 ) {

				// #ff0000
				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255;
				this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255;
				this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255;

				ColorManagement.toWorkingColorSpace( this, colorSpace );

				return this;

			}

		}

		if ( style && style.length > 0 ) {

			return this.setColorName( style, colorSpace );

		}

		return this;

	}

	setColorName( style, colorSpace = SRGBColorSpace ) {

		// color keywords
		const hex = _colorKeywords[ style.toLowerCase() ];

		if ( hex !== undefined ) {

			// red
			this.setHex( hex, colorSpace );

		} else {

			// unknown color
			console.warn( 'THREE.Color: Unknown color ' + style );

		}

		return this;

	}

	clone() {

		return new this.constructor( this.r, this.g, this.b );

	}

	copy( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	}

	copySRGBToLinear( color ) {

		this.r = SRGBToLinear( color.r );
		this.g = SRGBToLinear( color.g );
		this.b = SRGBToLinear( color.b );

		return this;

	}

	copyLinearToSRGB( color ) {

		this.r = LinearToSRGB( color.r );
		this.g = LinearToSRGB( color.g );
		this.b = LinearToSRGB( color.b );

		return this;

	}

	convertSRGBToLinear() {

		this.copySRGBToLinear( this );

		return this;

	}

	convertLinearToSRGB() {

		this.copyLinearToSRGB( this );

		return this;

	}

	getHex( colorSpace = SRGBColorSpace ) {

		ColorManagement.fromWorkingColorSpace( toComponents( this, _rgb ), colorSpace );

		return clamp( _rgb.r * 255, 0, 255 ) << 16 ^ clamp( _rgb.g * 255, 0, 255 ) << 8 ^ clamp( _rgb.b * 255, 0, 255 ) << 0;

	}

	getHexString( colorSpace = SRGBColorSpace ) {

		return ( '000000' + this.getHex( colorSpace ).toString( 16 ) ).slice( - 6 );

	}

	getHSL( target, colorSpace = LinearSRGBColorSpace ) {

		// h,s,l ranges are in 0.0 - 1.0

		ColorManagement.fromWorkingColorSpace( toComponents( this, _rgb ), colorSpace );

		const r = _rgb.r, g = _rgb.g, b = _rgb.b;

		const max = Math.max( r, g, b );
		const min = Math.min( r, g, b );

		let hue, saturation;
		const lightness = ( min + max ) / 2.0;

		if ( min === max ) {

			hue = 0;
			saturation = 0;

		} else {

			const delta = max - min;

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;

		}

		target.h = hue;
		target.s = saturation;
		target.l = lightness;

		return target;

	}

	getRGB( target, colorSpace = LinearSRGBColorSpace ) {

		ColorManagement.fromWorkingColorSpace( toComponents( this, _rgb ), colorSpace );

		target.r = _rgb.r;
		target.g = _rgb.g;
		target.b = _rgb.b;

		return target;

	}

	getStyle( colorSpace = SRGBColorSpace ) {

		ColorManagement.fromWorkingColorSpace( toComponents( this, _rgb ), colorSpace );

		if ( colorSpace !== SRGBColorSpace ) {

			// Requires CSS Color Module Level 4 (https://www.w3.org/TR/css-color-4/).
			return `color(${ colorSpace } ${ _rgb.r } ${ _rgb.g } ${ _rgb.b })`;

		}

		return `rgb(${( _rgb.r * 255 ) | 0},${( _rgb.g * 255 ) | 0},${( _rgb.b * 255 ) | 0})`;

	}

	offsetHSL( h, s, l ) {

		this.getHSL( _hslA );

		_hslA.h += h; _hslA.s += s; _hslA.l += l;

		this.setHSL( _hslA.h, _hslA.s, _hslA.l );

		return this;

	}

	add( color ) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	}

	addColors( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	}

	addScalar( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	}

	sub( color ) {

		this.r = Math.max( 0, this.r - color.r );
		this.g = Math.max( 0, this.g - color.g );
		this.b = Math.max( 0, this.b - color.b );

		return this;

	}

	multiply( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	}

	multiplyScalar( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	}

	lerp( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	}

	lerpColors( color1, color2, alpha ) {

		this.r = color1.r + ( color2.r - color1.r ) * alpha;
		this.g = color1.g + ( color2.g - color1.g ) * alpha;
		this.b = color1.b + ( color2.b - color1.b ) * alpha;

		return this;

	}

	lerpHSL( color, alpha ) {

		this.getHSL( _hslA );
		color.getHSL( _hslB );

		const h = lerp( _hslA.h, _hslB.h, alpha );
		const s = lerp( _hslA.s, _hslB.s, alpha );
		const l = lerp( _hslA.l, _hslB.l, alpha );

		this.setHSL( h, s, l );

		return this;

	}

	equals( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	}

	fromArray( array, offset = 0 ) {

		this.r = array[ offset ];
		this.g = array[ offset + 1 ];
		this.b = array[ offset + 2 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.r;
		array[ offset + 1 ] = this.g;
		array[ offset + 2 ] = this.b;

		return array;

	}

	fromBufferAttribute( attribute, index ) {

		this.r = attribute.getX( index );
		this.g = attribute.getY( index );
		this.b = attribute.getZ( index );

		if ( attribute.normalized === true ) {

			// assuming Uint8Array

			this.r /= 255;
			this.g /= 255;
			this.b /= 255;

		}

		return this;

	}

	toJSON() {

		return this.getHex();

	}

	*[ Symbol.iterator ]() {

		yield this.r;
		yield this.g;
		yield this.b;

	}

}

Color.NAMES = _colorKeywords;

let _canvas;

class ImageUtils {

	static getDataURL( image ) {

		if ( /^data:/i.test( image.src ) ) {

			return image.src;

		}

		if ( typeof HTMLCanvasElement == 'undefined' ) {

			return image.src;

		}

		let canvas;

		if ( image instanceof HTMLCanvasElement ) {

			canvas = image;

		} else {

			if ( _canvas === undefined ) _canvas = createElementNS( 'canvas' );

			_canvas.width = image.width;
			_canvas.height = image.height;

			const context = _canvas.getContext( '2d' );

			if ( image instanceof ImageData ) {

				context.putImageData( image, 0, 0 );

			} else {

				context.drawImage( image, 0, 0, image.width, image.height );

			}

			canvas = _canvas;

		}

		if ( canvas.width > 2048 || canvas.height > 2048 ) {

			console.warn( 'THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons', image );

			return canvas.toDataURL( 'image/jpeg', 0.6 );

		} else {

			return canvas.toDataURL( 'image/png' );

		}

	}

	static sRGBToLinear( image ) {

		if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
			( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
			( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

			const canvas = createElementNS( 'canvas' );

			canvas.width = image.width;
			canvas.height = image.height;

			const context = canvas.getContext( '2d' );
			context.drawImage( image, 0, 0, image.width, image.height );

			const imageData = context.getImageData( 0, 0, image.width, image.height );
			const data = imageData.data;

			for ( let i = 0; i < data.length; i ++ ) {

				data[ i ] = SRGBToLinear( data[ i ] / 255 ) * 255;

			}

			context.putImageData( imageData, 0, 0 );

			return canvas;

		} else if ( image.data ) {

			const data = image.data.slice( 0 );

			for ( let i = 0; i < data.length; i ++ ) {

				if ( data instanceof Uint8Array || data instanceof Uint8ClampedArray ) {

					data[ i ] = Math.floor( SRGBToLinear( data[ i ] / 255 ) * 255 );

				} else {

					// assuming float

					data[ i ] = SRGBToLinear( data[ i ] );

				}

			}

			return {
				data: data,
				width: image.width,
				height: image.height
			};

		} else {

			console.warn( 'THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.' );
			return image;

		}

	}

}

class Source {

	constructor( data = null ) {

		this.isSource = true;

		this.uuid = generateUUID();

		this.data = data;

		this.version = 0;

	}

	set needsUpdate( value ) {

		if ( value === true ) this.version ++;

	}

	toJSON( meta ) {

		const isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( ! isRootObject && meta.images[ this.uuid ] !== undefined ) {

			return meta.images[ this.uuid ];

		}

		const output = {
			uuid: this.uuid,
			url: ''
		};

		const data = this.data;

		if ( data !== null ) {

			let url;

			if ( Array.isArray( data ) ) {

				// cube texture

				url = [];

				for ( let i = 0, l = data.length; i < l; i ++ ) {

					if ( data[ i ].isDataTexture ) {

						url.push( serializeImage( data[ i ].image ) );

					} else {

						url.push( serializeImage( data[ i ] ) );

					}

				}

			} else {

				// texture

				url = serializeImage( data );

			}

			output.url = url;

		}

		if ( ! isRootObject ) {

			meta.images[ this.uuid ] = output;

		}

		return output;

	}

}

function serializeImage( image ) {

	if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
		( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
		( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

		// default images

		return ImageUtils.getDataURL( image );

	} else {

		if ( image.data ) {

			// images of DataTexture

			return {
				data: Array.from( image.data ),
				width: image.width,
				height: image.height,
				type: image.data.constructor.name
			};

		} else {

			console.warn( 'THREE.Texture: Unable to serialize Texture.' );
			return {};

		}

	}

}

let textureId = 0;

class Texture extends EventDispatcher {

	constructor( image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = 1, encoding = LinearEncoding ) {

		super();

		this.isTexture = true;

		Object.defineProperty( this, 'id', { value: textureId ++ } );

		this.uuid = generateUUID();

		this.name = '';

		this.source = new Source( image );
		this.mipmaps = [];

		this.mapping = mapping;

		this.wrapS = wrapS;
		this.wrapT = wrapT;

		this.magFilter = magFilter;
		this.minFilter = minFilter;

		this.anisotropy = anisotropy;

		this.format = format;
		this.internalFormat = null;
		this.type = type;

		this.offset = new Vector2( 0, 0 );
		this.repeat = new Vector2( 1, 1 );
		this.center = new Vector2( 0, 0 );
		this.rotation = 0;

		this.matrixAutoUpdate = true;
		this.matrix = new Matrix3();

		this.generateMipmaps = true;
		this.premultiplyAlpha = false;
		this.flipY = true;
		this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

		// Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
		//
		// Also changing the encoding after already used by a Material will not automatically make the Material
		// update. You need to explicitly call Material.needsUpdate to trigger it to recompile.
		this.encoding = encoding;

		this.userData = {};

		this.version = 0;
		this.onUpdate = null;

		this.isRenderTargetTexture = false; // indicates whether a texture belongs to a render target or not
		this.needsPMREMUpdate = false; // indicates whether this texture should be processed by PMREMGenerator or not (only relevant for render target textures)

	}

	get image() {

		return this.source.data;

	}

	set image( value ) {

		this.source.data = value;

	}

	updateMatrix() {

		this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( source ) {

		this.name = source.name;

		this.source = source.source;
		this.mipmaps = source.mipmaps.slice( 0 );

		this.mapping = source.mapping;

		this.wrapS = source.wrapS;
		this.wrapT = source.wrapT;

		this.magFilter = source.magFilter;
		this.minFilter = source.minFilter;

		this.anisotropy = source.anisotropy;

		this.format = source.format;
		this.internalFormat = source.internalFormat;
		this.type = source.type;

		this.offset.copy( source.offset );
		this.repeat.copy( source.repeat );
		this.center.copy( source.center );
		this.rotation = source.rotation;

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrix.copy( source.matrix );

		this.generateMipmaps = source.generateMipmaps;
		this.premultiplyAlpha = source.premultiplyAlpha;
		this.flipY = source.flipY;
		this.unpackAlignment = source.unpackAlignment;
		this.encoding = source.encoding;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		this.needsUpdate = true;

		return this;

	}

	toJSON( meta ) {

		const isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

			return meta.textures[ this.uuid ];

		}

		const output = {

			metadata: {
				version: 4.5,
				type: 'Texture',
				generator: 'Texture.toJSON'
			},

			uuid: this.uuid,
			name: this.name,

			image: this.source.toJSON( meta ).uuid,

			mapping: this.mapping,

			repeat: [ this.repeat.x, this.repeat.y ],
			offset: [ this.offset.x, this.offset.y ],
			center: [ this.center.x, this.center.y ],
			rotation: this.rotation,

			wrap: [ this.wrapS, this.wrapT ],

			format: this.format,
			type: this.type,
			encoding: this.encoding,

			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,

			flipY: this.flipY,

			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment

		};

		if ( JSON.stringify( this.userData ) !== '{}' ) output.userData = this.userData;

		if ( ! isRootObject ) {

			meta.textures[ this.uuid ] = output;

		}

		return output;

	}

	dispose() {

		this.dispatchEvent( { type: 'dispose' } );

	}

	transformUv( uv ) {

		if ( this.mapping !== UVMapping ) return uv;

		uv.applyMatrix3( this.matrix );

		if ( uv.x < 0 || uv.x > 1 ) {

			switch ( this.wrapS ) {

				case RepeatWrapping:

					uv.x = uv.x - Math.floor( uv.x );
					break;

				case ClampToEdgeWrapping:

					uv.x = uv.x < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

						uv.x = Math.ceil( uv.x ) - uv.x;

					} else {

						uv.x = uv.x - Math.floor( uv.x );

					}

					break;

			}

		}

		if ( uv.y < 0 || uv.y > 1 ) {

			switch ( this.wrapT ) {

				case RepeatWrapping:

					uv.y = uv.y - Math.floor( uv.y );
					break;

				case ClampToEdgeWrapping:

					uv.y = uv.y < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

						uv.y = Math.ceil( uv.y ) - uv.y;

					} else {

						uv.y = uv.y - Math.floor( uv.y );

					}

					break;

			}

		}

		if ( this.flipY ) {

			uv.y = 1 - uv.y;

		}

		return uv;

	}

	set needsUpdate( value ) {

		if ( value === true ) {

			this.version ++;
			this.source.needsUpdate = true;

		}

	}

}

Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;

class Vector4 {

	constructor( x = 0, y = 0, z = 0, w = 1 ) {

		Vector4.prototype.isVector4 = true;

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

	}

	get width() {

		return this.z;

	}

	set width( value ) {

		this.z = value;

	}

	get height() {

		return this.w;

	}

	set height( value ) {

		this.w = value;

	}

	set( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	}

	setScalar( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		this.w = scalar;

		return this;

	}

	setX( x ) {

		this.x = x;

		return this;

	}

	setY( y ) {

		this.y = y;

		return this;

	}

	setZ( z ) {

		this.z = z;

		return this;

	}

	setW( w ) {

		this.w = w;

		return this;

	}

	setComponent( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	clone() {

		return new this.constructor( this.x, this.y, this.z, this.w );

	}

	copy( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	}

	add( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	}

	addScalar( s ) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;

	}

	addVectors( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	}

	addScaledVector( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
		this.w += v.w * s;

		return this;

	}

	sub( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	}

	subScalar( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;
		this.w -= s;

		return this;

	}

	subVectors( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	}

	multiply( v ) {

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		this.w *= v.w;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;

	}

	applyMatrix4( m ) {

		const x = this.x, y = this.y, z = this.z, w = this.w;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

		return this;

	}

	divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}

	setAxisAngleFromQuaternion( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos( q.w );

		const s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			this.x = 1;
			this.y = 0;
			this.z = 0;

		} else {

			this.x = q.x / s;
			this.y = q.y / s;
			this.z = q.z / s;

		}

		return this;

	}

	setAxisAngleFromRotationMatrix( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		let angle, x, y, z; // variables for result
		const epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( Math.abs( m12 - m21 ) < epsilon ) &&
		     ( Math.abs( m13 - m31 ) < epsilon ) &&
		     ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 ) &&
			     ( Math.abs( m13 + m31 ) < epsilon2 ) &&
			     ( Math.abs( m23 + m32 ) < epsilon2 ) &&
			     ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			const xx = ( m11 + 1 ) / 2;
			const yy = ( m22 + 1 ) / 2;
			const zz = ( m33 + 1 ) / 2;
			const xy = ( m12 + m21 ) / 4;
			const xz = ( m13 + m31 ) / 4;
			const yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) {

				// m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) {

				// m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else {

				// m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		let s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 ) +
			( m13 - m31 ) * ( m13 - m31 ) +
			( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) s = 1;

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	}

	min( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );
		this.w = Math.min( this.w, v.w );

		return this;

	}

	max( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );
		this.w = Math.max( this.w, v.w );

		return this;

	}

	clamp( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );
		this.w = Math.max( min.w, Math.min( max.w, this.w ) );

		return this;

	}

	clampScalar( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );
		this.w = Math.max( minVal, Math.min( maxVal, this.w ) );

		return this;

	}

	clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );
		this.w = Math.floor( this.w );

		return this;

	}

	ceil() {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );
		this.w = Math.ceil( this.w );

		return this;

	}

	round() {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );
		this.w = Math.round( this.w );

		return this;

	}

	roundToZero() {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
		this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

		return this;

	}

	negate() {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		this.w = - this.w;

		return this;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	}

	lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	}

	manhattanLength() {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	}

	normalize() {

		return this.divideScalar( this.length() || 1 );

	}

	setLength( length ) {

		return this.normalize().multiplyScalar( length );

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;
		this.w = v1.w + ( v2.w - v1.w ) * alpha;

		return this;

	}

	equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	}

	fromArray( array, offset = 0 ) {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];
		this.w = array[ offset + 3 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;
		array[ offset + 3 ] = this.w;

		return array;

	}

	fromBufferAttribute( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector4: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );
		this.w = attribute.getW( index );

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();
		this.w = Math.random();

		return this;

	}

	*[ Symbol.iterator ]() {

		yield this.x;
		yield this.y;
		yield this.z;
		yield this.w;

	}

}

class Quaternion {

	constructor( x = 0, y = 0, z = 0, w = 1 ) {

		this.isQuaternion = true;

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

	}

	static slerp( qa, qb, qm, t ) {

		console.warn( 'THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.' );
		return qm.slerpQuaternions( qa, qb, t );

	}

	static slerpFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

		// fuzz-free, array-based Quaternion SLERP operation

		let x0 = src0[ srcOffset0 + 0 ],
			y0 = src0[ srcOffset0 + 1 ],
			z0 = src0[ srcOffset0 + 2 ],
			w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 + 0 ],
			y1 = src1[ srcOffset1 + 1 ],
			z1 = src1[ srcOffset1 + 2 ],
			w1 = src1[ srcOffset1 + 3 ];

		if ( t === 0 ) {

			dst[ dstOffset + 0 ] = x0;
			dst[ dstOffset + 1 ] = y0;
			dst[ dstOffset + 2 ] = z0;
			dst[ dstOffset + 3 ] = w0;
			return;

		}

		if ( t === 1 ) {

			dst[ dstOffset + 0 ] = x1;
			dst[ dstOffset + 1 ] = y1;
			dst[ dstOffset + 2 ] = z1;
			dst[ dstOffset + 3 ] = w1;
			return;

		}

		if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

			let s = 1 - t;
			const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
				dir = ( cos >= 0 ? 1 : - 1 ),
				sqrSin = 1 - cos * cos;

			// Skip the Slerp for tiny steps to avoid numeric problems:
			if ( sqrSin > Number.EPSILON ) {

				const sin = Math.sqrt( sqrSin ),
					len = Math.atan2( sin, cos * dir );

				s = Math.sin( s * len ) / sin;
				t = Math.sin( t * len ) / sin;

			}

			const tDir = t * dir;

			x0 = x0 * s + x1 * tDir;
			y0 = y0 * s + y1 * tDir;
			z0 = z0 * s + z1 * tDir;
			w0 = w0 * s + w1 * tDir;

			// Normalize in case we just did a lerp:
			if ( s === 1 - t ) {

				const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

				x0 *= f;
				y0 *= f;
				z0 *= f;
				w0 *= f;

			}

		}

		dst[ dstOffset ] = x0;
		dst[ dstOffset + 1 ] = y0;
		dst[ dstOffset + 2 ] = z0;
		dst[ dstOffset + 3 ] = w0;

	}

	static multiplyQuaternionsFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1 ) {

		const x0 = src0[ srcOffset0 ];
		const y0 = src0[ srcOffset0 + 1 ];
		const z0 = src0[ srcOffset0 + 2 ];
		const w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 ];
		const y1 = src1[ srcOffset1 + 1 ];
		const z1 = src1[ srcOffset1 + 2 ];
		const w1 = src1[ srcOffset1 + 3 ];

		dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
		dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
		dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
		dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

		return dst;

	}

	get x() {

		return this._x;

	}

	set x( value ) {

		this._x = value;
		this._onChangeCallback();

	}

	get y() {

		return this._y;

	}

	set y( value ) {

		this._y = value;
		this._onChangeCallback();

	}

	get z() {

		return this._z;

	}

	set z( value ) {

		this._z = value;
		this._onChangeCallback();

	}

	get w() {

		return this._w;

	}

	set w( value ) {

		this._w = value;
		this._onChangeCallback();

	}

	set( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this._onChangeCallback();

		return this;

	}

	clone() {

		return new this.constructor( this._x, this._y, this._z, this._w );

	}

	copy( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this._onChangeCallback();

		return this;

	}

	setFromEuler( euler, update ) {

		if ( ! ( euler && euler.isEuler ) ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		const x = euler._x, y = euler._y, z = euler._z, order = euler._order;

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		const cos = Math.cos;
		const sin = Math.sin;

		const c1 = cos( x / 2 );
		const c2 = cos( y / 2 );
		const c3 = cos( z / 2 );

		const s1 = sin( x / 2 );
		const s2 = sin( y / 2 );
		const s3 = sin( z / 2 );

		switch ( order ) {

			case 'XYZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'YXZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'ZXY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'ZYX':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'YZX':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'XZY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			default:
				console.warn( 'THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order );

		}

		if ( update !== false ) this._onChangeCallback();

		return this;

	}

	setFromAxisAngle( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		const halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this._onChangeCallback();

		return this;

	}

	setFromRotationMatrix( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33;

		if ( trace > 0 ) {

			const s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this._onChangeCallback();

		return this;

	}

	setFromUnitVectors( vFrom, vTo ) {

		// assumes direction vectors vFrom and vTo are normalized

		let r = vFrom.dot( vTo ) + 1;

		if ( r < Number.EPSILON ) {

			// vFrom and vTo point in opposite directions

			r = 0;

			if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

				this._x = - vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;

			} else {

				this._x = 0;
				this._y = - vFrom.z;
				this._z = vFrom.y;
				this._w = r;

			}

		} else {

			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
			this._w = r;

		}

		return this.normalize();

	}

	angleTo( q ) {

		return 2 * Math.acos( Math.abs( clamp( this.dot( q ), - 1, 1 ) ) );

	}

	rotateTowards( q, step ) {

		const angle = this.angleTo( q );

		if ( angle === 0 ) return this;

		const t = Math.min( 1, step / angle );

		this.slerp( q, t );

		return this;

	}

	identity() {

		return this.set( 0, 0, 0, 1 );

	}

	invert() {

		// quaternion is assumed to have unit length

		return this.conjugate();

	}

	conjugate() {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this._onChangeCallback();

		return this;

	}

	dot( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	}

	lengthSq() {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	}

	length() {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	}

	normalize() {

		let l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this._onChangeCallback();

		return this;

	}

	multiply( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	}

	premultiply( q ) {

		return this.multiplyQuaternions( q, this );

	}

	multiplyQuaternions( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this._onChangeCallback();

		return this;

	}

	slerp( qb, t ) {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		const x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if ( sqrSinHalfTheta <= Number.EPSILON ) {

			const s = 1 - t;
			this._w = s * w + t * this._w;
			this._x = s * x + t * this._x;
			this._y = s * y + t * this._y;
			this._z = s * z + t * this._z;

			this.normalize();
			this._onChangeCallback();

			return this;

		}

		const sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
		const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
		const ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this._onChangeCallback();

		return this;

	}

	slerpQuaternions( qa, qb, t ) {

		return this.copy( qa ).slerp( qb, t );

	}

	random() {

		// Derived from http://planning.cs.uiuc.edu/node198.html
		// Note, this source uses w, x, y, z ordering,
		// so we swap the order below.

		const u1 = Math.random();
		const sqrt1u1 = Math.sqrt( 1 - u1 );
		const sqrtu1 = Math.sqrt( u1 );

		const u2 = 2 * Math.PI * Math.random();

		const u3 = 2 * Math.PI * Math.random();

		return this.set(
			sqrt1u1 * Math.cos( u2 ),
			sqrtu1 * Math.sin( u3 ),
			sqrtu1 * Math.cos( u3 ),
			sqrt1u1 * Math.sin( u2 ),
		);

	}

	equals( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	}

	fromArray( array, offset = 0 ) {

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this._onChangeCallback();

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	}

	fromBufferAttribute( attribute, index ) {

		this._x = attribute.getX( index );
		this._y = attribute.getY( index );
		this._z = attribute.getZ( index );
		this._w = attribute.getW( index );

		return this;

	}

	_onChange( callback ) {

		this._onChangeCallback = callback;

		return this;

	}

	_onChangeCallback() {}

	*[ Symbol.iterator ]() {

		yield this._x;
		yield this._y;
		yield this._z;
		yield this._w;

	}

}

class Vector3 {

	constructor( x = 0, y = 0, z = 0 ) {

		Vector3.prototype.isVector3 = true;

		this.x = x;
		this.y = y;
		this.z = z;

	}

	set( x, y, z ) {

		if ( z === undefined ) z = this.z; // sprite.scale.set(x,y)

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	setScalar( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;

	}

	setX( x ) {

		this.x = x;

		return this;

	}

	setY( y ) {

		this.y = y;

		return this;

	}

	setZ( z ) {

		this.z = z;

		return this;

	}

	setComponent( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	clone() {

		return new this.constructor( this.x, this.y, this.z );

	}

	copy( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	}

	add( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	}

	addScalar( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	}

	addVectors( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	}

	addScaledVector( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;

	}

	sub( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	}

	subScalar( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	}

	subVectors( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	}

	multiply( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	}

	multiplyVectors( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	}

	applyEuler( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		return this.applyQuaternion( _quaternion$4.setFromEuler( euler ) );

	}

	applyAxisAngle( axis, angle ) {

		return this.applyQuaternion( _quaternion$4.setFromAxisAngle( axis, angle ) );

	}

	applyMatrix3( m ) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	}

	applyNormalMatrix( m ) {

		return this.applyMatrix3( m ).normalize();

	}

	applyMatrix4( m ) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		const w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

		return this;

	}

	applyQuaternion( q ) {

		const x = this.x, y = this.y, z = this.z;
		const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		const ix = qw * x + qy * z - qz * y;
		const iy = qw * y + qz * x - qx * z;
		const iz = qw * z + qx * y - qy * x;
		const iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	}

	project( camera ) {

		return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

	}

	unproject( camera ) {

		return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

	}

	transformDirection( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this.normalize();

	}

	divide( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}

	min( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );

		return this;

	}

	max( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );

		return this;

	}

	clamp( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );

		return this;

	}

	clampScalar( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

		return this;

	}

	clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	}

	ceil() {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	}

	round() {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	}

	roundToZero() {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	}

	negate() {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	// TODO lengthSquared?

	lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	}

	manhattanLength() {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	}

	normalize() {

		return this.divideScalar( this.length() || 1 );

	}

	setLength( length ) {

		return this.normalize().multiplyScalar( length );

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;

		return this;

	}

	cross( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		return this.crossVectors( this, v );

	}

	crossVectors( a, b ) {

		const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	projectOnVector( v ) {

		const denominator = v.lengthSq();

		if ( denominator === 0 ) return this.set( 0, 0, 0 );

		const scalar = v.dot( this ) / denominator;

		return this.copy( v ).multiplyScalar( scalar );

	}

	projectOnPlane( planeNormal ) {

		_vector$c.copy( this ).projectOnVector( planeNormal );

		return this.sub( _vector$c );

	}

	reflect( normal ) {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		return this.sub( _vector$c.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

	}

	angleTo( v ) {

		const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

		if ( denominator === 0 ) return Math.PI / 2;

		const theta = this.dot( v ) / denominator;

		// clamp, to handle numerical problems

		return Math.acos( clamp( theta, - 1, 1 ) );

	}

	distanceTo( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	}

	distanceToSquared( v ) {

		const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	}

	manhattanDistanceTo( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

	}

	setFromSpherical( s ) {

		return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

	}

	setFromSphericalCoords( radius, phi, theta ) {

		const sinPhiRadius = Math.sin( phi ) * radius;

		this.x = sinPhiRadius * Math.sin( theta );
		this.y = Math.cos( phi ) * radius;
		this.z = sinPhiRadius * Math.cos( theta );

		return this;

	}

	setFromCylindrical( c ) {

		return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

	}

	setFromCylindricalCoords( radius, theta, y ) {

		this.x = radius * Math.sin( theta );
		this.y = y;
		this.z = radius * Math.cos( theta );

		return this;

	}

	setFromMatrixPosition( m ) {

		const e = m.elements;

		this.x = e[ 12 ];
		this.y = e[ 13 ];
		this.z = e[ 14 ];

		return this;

	}

	setFromMatrixScale( m ) {

		const sx = this.setFromMatrixColumn( m, 0 ).length();
		const sy = this.setFromMatrixColumn( m, 1 ).length();
		const sz = this.setFromMatrixColumn( m, 2 ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;

	}

	setFromMatrixColumn( m, index ) {

		return this.fromArray( m.elements, index * 4 );

	}

	setFromMatrix3Column( m, index ) {

		return this.fromArray( m.elements, index * 3 );

	}

	setFromEuler( e ) {

		this.x = e._x;
		this.y = e._y;
		this.z = e._z;

		return this;

	}

	equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	}

	fromArray( array, offset = 0 ) {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	}

	fromBufferAttribute( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector3: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();

		return this;

	}

	randomDirection() {

		// Derived from https://mathworld.wolfram.com/SpherePointPicking.html

		const u = ( Math.random() - 0.5 ) * 2;
		const t = Math.random() * Math.PI * 2;
		const f = Math.sqrt( 1 - u ** 2 );

		this.x = f * Math.cos( t );
		this.y = f * Math.sin( t );
		this.z = u;

		return this;

	}

	*[ Symbol.iterator ]() {

		yield this.x;
		yield this.y;
		yield this.z;

	}

}

const _vector$c = /*@__PURE__*/ new Vector3();
const _quaternion$4 = /*@__PURE__*/ new Quaternion();

class Box3 {

	constructor( min = new Vector3( + Infinity, + Infinity, + Infinity ), max = new Vector3( - Infinity, - Infinity, - Infinity ) ) {

		this.isBox3 = true;

		this.min = min;
		this.max = max;

	}

	set( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	}

	setFromArray( array ) {

		let minX = + Infinity;
		let minY = + Infinity;
		let minZ = + Infinity;

		let maxX = - Infinity;
		let maxY = - Infinity;
		let maxZ = - Infinity;

		for ( let i = 0, l = array.length; i < l; i += 3 ) {

			const x = array[ i ];
			const y = array[ i + 1 ];
			const z = array[ i + 2 ];

			if ( x < minX ) minX = x;
			if ( y < minY ) minY = y;
			if ( z < minZ ) minZ = z;

			if ( x > maxX ) maxX = x;
			if ( y > maxY ) maxY = y;
			if ( z > maxZ ) maxZ = z;

		}

		this.min.set( minX, minY, minZ );
		this.max.set( maxX, maxY, maxZ );

		return this;

	}

	setFromBufferAttribute( attribute ) {

		let minX = + Infinity;
		let minY = + Infinity;
		let minZ = + Infinity;

		let maxX = - Infinity;
		let maxY = - Infinity;
		let maxZ = - Infinity;

		for ( let i = 0, l = attribute.count; i < l; i ++ ) {

			const x = attribute.getX( i );
			const y = attribute.getY( i );
			const z = attribute.getZ( i );

			if ( x < minX ) minX = x;
			if ( y < minY ) minY = y;
			if ( z < minZ ) minZ = z;

			if ( x > maxX ) maxX = x;
			if ( y > maxY ) maxY = y;
			if ( z > maxZ ) maxZ = z;

		}

		this.min.set( minX, minY, minZ );
		this.max.set( maxX, maxY, maxZ );

		return this;

	}

	setFromPoints( points ) {

		this.makeEmpty();

		for ( let i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] );

		}

		return this;

	}

	setFromCenterAndSize( center, size ) {

		const halfSize = _vector$b.copy( size ).multiplyScalar( 0.5 );

		this.min.copy( center ).sub( halfSize );
		this.max.copy( center ).add( halfSize );

		return this;

	}

	setFromObject( object, precise = false ) {

		this.makeEmpty();

		return this.expandByObject( object, precise );

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	}

	makeEmpty() {

		this.min.x = this.min.y = this.min.z = + Infinity;
		this.max.x = this.max.y = this.max.z = - Infinity;

		return this;

	}

	isEmpty() {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

	}

	getCenter( target ) {

		return this.isEmpty() ? target.set( 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	}

	getSize( target ) {

		return this.isEmpty() ? target.set( 0, 0, 0 ) : target.subVectors( this.max, this.min );

	}

	expandByPoint( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	}

	expandByVector( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	}

	expandByScalar( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	}

	expandByObject( object, precise = false ) {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and children's, world transforms

		object.updateWorldMatrix( false, false );

		const geometry = object.geometry;

		if ( geometry !== undefined ) {

			if ( precise && geometry.attributes != undefined && geometry.attributes.position !== undefined ) {

				const position = geometry.attributes.position;
				for ( let i = 0, l = position.count; i < l; i ++ ) {

					_vector$b.fromBufferAttribute( position, i ).applyMatrix4( object.matrixWorld );
					this.expandByPoint( _vector$b );

				}

			} else {

				if ( geometry.boundingBox === null ) {

					geometry.computeBoundingBox();

				}

				_box$3.copy( geometry.boundingBox );
				_box$3.applyMatrix4( object.matrixWorld );

				this.union( _box$3 );

			}

		}

		const children = object.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			this.expandByObject( children[ i ], precise );

		}

		return this;

	}

	containsPoint( point ) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ||
			point.z < this.min.z || point.z > this.max.z ? false : true;

	}

	containsBox( box ) {

		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y &&
			this.min.z <= box.min.z && box.max.z <= this.max.z;

	}

	getParameter( point, target ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		return target.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z )
		);

	}

	intersectsBox( box ) {

		// using 6 splitting planes to rule out intersections.
		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ||
			box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

	}

	intersectsSphere( sphere ) {

		// Find the point on the AABB closest to the sphere center.
		this.clampPoint( sphere.center, _vector$b );

		// If that point is inside the sphere, the AABB and sphere intersect.
		return _vector$b.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

	}

	intersectsPlane( plane ) {

		// We compute the minimum and maximum dot product values. If those values
		// are on the same side (back or front) of the plane, then there is no intersection.

		let min, max;

		if ( plane.normal.x > 0 ) {

			min = plane.normal.x * this.min.x;
			max = plane.normal.x * this.max.x;

		} else {

			min = plane.normal.x * this.max.x;
			max = plane.normal.x * this.min.x;

		}

		if ( plane.normal.y > 0 ) {

			min += plane.normal.y * this.min.y;
			max += plane.normal.y * this.max.y;

		} else {

			min += plane.normal.y * this.max.y;
			max += plane.normal.y * this.min.y;

		}

		if ( plane.normal.z > 0 ) {

			min += plane.normal.z * this.min.z;
			max += plane.normal.z * this.max.z;

		} else {

			min += plane.normal.z * this.max.z;
			max += plane.normal.z * this.min.z;

		}

		return ( min <= - plane.constant && max >= - plane.constant );

	}

	intersectsTriangle( triangle ) {

		if ( this.isEmpty() ) {

			return false;

		}

		// compute box center and extents
		this.getCenter( _center );
		_extents.subVectors( this.max, _center );

		// translate triangle to aabb origin
		_v0$2.subVectors( triangle.a, _center );
		_v1$7.subVectors( triangle.b, _center );
		_v2$3.subVectors( triangle.c, _center );

		// compute edge vectors for triangle
		_f0.subVectors( _v1$7, _v0$2 );
		_f1.subVectors( _v2$3, _v1$7 );
		_f2.subVectors( _v0$2, _v2$3 );

		// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
		// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
		// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
		let axes = [
			0, - _f0.z, _f0.y, 0, - _f1.z, _f1.y, 0, - _f2.z, _f2.y,
			_f0.z, 0, - _f0.x, _f1.z, 0, - _f1.x, _f2.z, 0, - _f2.x,
			- _f0.y, _f0.x, 0, - _f1.y, _f1.x, 0, - _f2.y, _f2.x, 0
		];
		if ( ! satForAxes( axes, _v0$2, _v1$7, _v2$3, _extents ) ) {

			return false;

		}

		// test 3 face normals from the aabb
		axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
		if ( ! satForAxes( axes, _v0$2, _v1$7, _v2$3, _extents ) ) {

			return false;

		}

		// finally testing the face normal of the triangle
		// use already existing triangle edge vectors here
		_triangleNormal.crossVectors( _f0, _f1 );
		axes = [ _triangleNormal.x, _triangleNormal.y, _triangleNormal.z ];

		return satForAxes( axes, _v0$2, _v1$7, _v2$3, _extents );

	}

	clampPoint( point, target ) {

		return target.copy( point ).clamp( this.min, this.max );

	}

	distanceToPoint( point ) {

		const clampedPoint = _vector$b.copy( point ).clamp( this.min, this.max );

		return clampedPoint.sub( point ).length();

	}

	getBoundingSphere( target ) {

		this.getCenter( target.center );

		target.radius = this.getSize( _vector$b ).length() * 0.5;

		return target;

	}

	intersect( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
		if ( this.isEmpty() ) this.makeEmpty();

		return this;

	}

	union( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	}

	applyMatrix4( matrix ) {

		// transform of empty box is an empty box.
		if ( this.isEmpty() ) return this;

		// NOTE: I am using a binary pattern to specify all 2^3 combinations below
		_points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
		_points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
		_points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
		_points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
		_points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
		_points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
		_points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
		_points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 111

		this.setFromPoints( _points );

		return this;

	}

	translate( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	}

	equals( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	}

}

const _points = [
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3()
];

const _vector$b = /*@__PURE__*/ new Vector3();

const _box$3 = /*@__PURE__*/ new Box3();

// triangle centered vertices

const _v0$2 = /*@__PURE__*/ new Vector3();
const _v1$7 = /*@__PURE__*/ new Vector3();
const _v2$3 = /*@__PURE__*/ new Vector3();

// triangle edge vectors

const _f0 = /*@__PURE__*/ new Vector3();
const _f1 = /*@__PURE__*/ new Vector3();
const _f2 = /*@__PURE__*/ new Vector3();

const _center = /*@__PURE__*/ new Vector3();
const _extents = /*@__PURE__*/ new Vector3();
const _triangleNormal = /*@__PURE__*/ new Vector3();
const _testAxis = /*@__PURE__*/ new Vector3();

function satForAxes( axes, v0, v1, v2, extents ) {

	for ( let i = 0, j = axes.length - 3; i <= j; i += 3 ) {

		_testAxis.fromArray( axes, i );
		// project the aabb onto the separating axis
		const r = extents.x * Math.abs( _testAxis.x ) + extents.y * Math.abs( _testAxis.y ) + extents.z * Math.abs( _testAxis.z );
		// project all 3 vertices of the triangle onto the separating axis
		const p0 = v0.dot( _testAxis );
		const p1 = v1.dot( _testAxis );
		const p2 = v2.dot( _testAxis );
		// actual test, basically see if either of the most extreme of the triangle points intersects r
		if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

			// points of the projected triangle are outside the projected half-length of the aabb
			// the axis is separating and we can exit
			return false;

		}

	}

	return true;

}

const _box$2 = /*@__PURE__*/ new Box3();
const _v1$6 = /*@__PURE__*/ new Vector3();
const _toFarthestPoint = /*@__PURE__*/ new Vector3();
const _toPoint = /*@__PURE__*/ new Vector3();

class Sphere {

	constructor( center = new Vector3(), radius = - 1 ) {

		this.center = center;
		this.radius = radius;

	}

	set( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;

	}

	setFromPoints( points, optionalCenter ) {

		const center = this.center;

		if ( optionalCenter !== undefined ) {

			center.copy( optionalCenter );

		} else {

			_box$2.setFromPoints( points ).getCenter( center );

		}

		let maxRadiusSq = 0;

		for ( let i = 0, il = points.length; i < il; i ++ ) {

			maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

		}

		this.radius = Math.sqrt( maxRadiusSq );

		return this;

	}

	copy( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	}

	isEmpty() {

		return ( this.radius < 0 );

	}

	makeEmpty() {

		this.center.set( 0, 0, 0 );
		this.radius = - 1;

		return this;

	}

	containsPoint( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	}

	distanceToPoint( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	}

	intersectsSphere( sphere ) {

		const radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	}

	intersectsBox( box ) {

		return box.intersectsSphere( this );

	}

	intersectsPlane( plane ) {

		return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

	}

	clampPoint( point, target ) {

		const deltaLengthSq = this.center.distanceToSquared( point );

		target.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			target.sub( this.center ).normalize();
			target.multiplyScalar( this.radius ).add( this.center );

		}

		return target;

	}

	getBoundingBox( target ) {

		if ( this.isEmpty() ) {

			// Empty sphere produces empty bounding box
			target.makeEmpty();
			return target;

		}

		target.set( this.center, this.center );
		target.expandByScalar( this.radius );

		return target;

	}

	applyMatrix4( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	}

	translate( offset ) {

		this.center.add( offset );

		return this;

	}

	expandByPoint( point ) {

		// from https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L649-L671

		_toPoint.subVectors( point, this.center );

		const lengthSq = _toPoint.lengthSq();

		if ( lengthSq > ( this.radius * this.radius ) ) {

			const length = Math.sqrt( lengthSq );
			const missingRadiusHalf = ( length - this.radius ) * 0.5;

			// Nudge this sphere towards the target point. Add half the missing distance to radius,
			// and the other half to position. This gives a tighter enclosure, instead of if
			// the whole missing distance were just added to radius.

			this.center.add( _toPoint.multiplyScalar( missingRadiusHalf / length ) );
			this.radius += missingRadiusHalf;

		}

		return this;

	}

	union( sphere ) {

		// from https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L759-L769

		// To enclose another sphere into this sphere, we only need to enclose two points:
		// 1) Enclose the farthest point on the other sphere into this sphere.
		// 2) Enclose the opposite point of the farthest point into this sphere.

		 if ( this.center.equals( sphere.center ) === true ) {

			 _toFarthestPoint.set( 0, 0, 1 ).multiplyScalar( sphere.radius );


		} else {

			_toFarthestPoint.subVectors( sphere.center, this.center ).normalize().multiplyScalar( sphere.radius );

		}

		this.expandByPoint( _v1$6.copy( sphere.center ).add( _toFarthestPoint ) );
		this.expandByPoint( _v1$6.copy( sphere.center ).sub( _toFarthestPoint ) );

		return this;

	}

	equals( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

const _vector$a = /*@__PURE__*/ new Vector3();
const _segCenter = /*@__PURE__*/ new Vector3();
const _segDir = /*@__PURE__*/ new Vector3();
const _diff = /*@__PURE__*/ new Vector3();

const _edge1 = /*@__PURE__*/ new Vector3();
const _edge2 = /*@__PURE__*/ new Vector3();
const _normal$1 = /*@__PURE__*/ new Vector3();

class Ray {

	constructor( origin = new Vector3(), direction = new Vector3( 0, 0, - 1 ) ) {

		this.origin = origin;
		this.direction = direction;

	}

	set( origin, direction ) {

		this.origin.copy( origin );
		this.direction.copy( direction );

		return this;

	}

	copy( ray ) {

		this.origin.copy( ray.origin );
		this.direction.copy( ray.direction );

		return this;

	}

	at( t, target ) {

		return target.copy( this.direction ).multiplyScalar( t ).add( this.origin );

	}

	lookAt( v ) {

		this.direction.copy( v ).sub( this.origin ).normalize();

		return this;

	}

	recast( t ) {

		this.origin.copy( this.at( t, _vector$a ) );

		return this;

	}

	closestPointToPoint( point, target ) {

		target.subVectors( point, this.origin );

		const directionDistance = target.dot( this.direction );

		if ( directionDistance < 0 ) {

			return target.copy( this.origin );

		}

		return target.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

	}

	distanceToPoint( point ) {

		return Math.sqrt( this.distanceSqToPoint( point ) );

	}

	distanceSqToPoint( point ) {

		const directionDistance = _vector$a.subVectors( point, this.origin ).dot( this.direction );

		// point behind the ray

		if ( directionDistance < 0 ) {

			return this.origin.distanceToSquared( point );

		}

		_vector$a.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

		return _vector$a.distanceToSquared( point );

	}

	distanceSqToSegment( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

		// from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteDistRaySegment.h
		// It returns the min distance between the ray and the segment
		// defined by v0 and v1
		// It can also set two optional targets :
		// - The closest point on the ray
		// - The closest point on the segment

		_segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
		_segDir.copy( v1 ).sub( v0 ).normalize();
		_diff.copy( this.origin ).sub( _segCenter );

		const segExtent = v0.distanceTo( v1 ) * 0.5;
		const a01 = - this.direction.dot( _segDir );
		const b0 = _diff.dot( this.direction );
		const b1 = - _diff.dot( _segDir );
		const c = _diff.lengthSq();
		const det = Math.abs( 1 - a01 * a01 );
		let s0, s1, sqrDist, extDet;

		if ( det > 0 ) {

			// The ray and segment are not parallel.

			s0 = a01 * b1 - b0;
			s1 = a01 * b0 - b1;
			extDet = segExtent * det;

			if ( s0 >= 0 ) {

				if ( s1 >= - extDet ) {

					if ( s1 <= extDet ) {

						// region 0
						// Minimum at interior points of ray and segment.

						const invDet = 1 / det;
						s0 *= invDet;
						s1 *= invDet;
						sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

					} else {

						// region 1

						s1 = segExtent;
						s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				} else {

					// region 5

					s1 = - segExtent;
					s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			} else {

				if ( s1 <= - extDet ) {

					// region 4

					s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				} else if ( s1 <= extDet ) {

					// region 3

					s0 = 0;
					s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = s1 * ( s1 + 2 * b1 ) + c;

				} else {

					// region 2

					s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			}

		} else {

			// Ray and segment are parallel.

			s1 = ( a01 > 0 ) ? - segExtent : segExtent;
			s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
			sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

		}

		if ( optionalPointOnRay ) {

			optionalPointOnRay.copy( this.direction ).multiplyScalar( s0 ).add( this.origin );

		}

		if ( optionalPointOnSegment ) {

			optionalPointOnSegment.copy( _segDir ).multiplyScalar( s1 ).add( _segCenter );

		}

		return sqrDist;

	}

	intersectSphere( sphere, target ) {

		_vector$a.subVectors( sphere.center, this.origin );
		const tca = _vector$a.dot( this.direction );
		const d2 = _vector$a.dot( _vector$a ) - tca * tca;
		const radius2 = sphere.radius * sphere.radius;

		if ( d2 > radius2 ) return null;

		const thc = Math.sqrt( radius2 - d2 );

		// t0 = first intersect point - entrance on front of sphere
		const t0 = tca - thc;

		// t1 = second intersect point - exit point on back of sphere
		const t1 = tca + thc;

		// test to see if both t0 and t1 are behind the ray - if so, return null
		if ( t0 < 0 && t1 < 0 ) return null;

		// test to see if t0 is behind the ray:
		// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
		// in order to always return an intersect point that is in front of the ray.
		if ( t0 < 0 ) return this.at( t1, target );

		// else t0 is in front of the ray, so return the first collision point scaled by t0
		return this.at( t0, target );

	}

	intersectsSphere( sphere ) {

		return this.distanceSqToPoint( sphere.center ) <= ( sphere.radius * sphere.radius );

	}

	distanceToPlane( plane ) {

		const denominator = plane.normal.dot( this.direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( plane.distanceToPoint( this.origin ) === 0 ) {

				return 0;

			}

			// Null is preferable to undefined since undefined means.... it is undefined

			return null;

		}

		const t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

		// Return if the ray never intersects the plane

		return t >= 0 ? t : null;

	}

	intersectPlane( plane, target ) {

		const t = this.distanceToPlane( plane );

		if ( t === null ) {

			return null;

		}

		return this.at( t, target );

	}

	intersectsPlane( plane ) {

		// check if the ray lies on the plane first

		const distToPoint = plane.distanceToPoint( this.origin );

		if ( distToPoint === 0 ) {

			return true;

		}

		const denominator = plane.normal.dot( this.direction );

		if ( denominator * distToPoint < 0 ) {

			return true;

		}

		// ray origin is behind the plane (and is pointing behind it)

		return false;

	}

	intersectBox( box, target ) {

		let tmin, tmax, tymin, tymax, tzmin, tzmax;

		const invdirx = 1 / this.direction.x,
			invdiry = 1 / this.direction.y,
			invdirz = 1 / this.direction.z;

		const origin = this.origin;

		if ( invdirx >= 0 ) {

			tmin = ( box.min.x - origin.x ) * invdirx;
			tmax = ( box.max.x - origin.x ) * invdirx;

		} else {

			tmin = ( box.max.x - origin.x ) * invdirx;
			tmax = ( box.min.x - origin.x ) * invdirx;

		}

		if ( invdiry >= 0 ) {

			tymin = ( box.min.y - origin.y ) * invdiry;
			tymax = ( box.max.y - origin.y ) * invdiry;

		} else {

			tymin = ( box.max.y - origin.y ) * invdiry;
			tymax = ( box.min.y - origin.y ) * invdiry;

		}

		if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

		// These lines also handle the case where tmin or tmax is NaN
		// (result of 0 * Infinity). x !== x returns true if x is NaN

		if ( tymin > tmin || tmin !== tmin ) tmin = tymin;

		if ( tymax < tmax || tmax !== tmax ) tmax = tymax;

		if ( invdirz >= 0 ) {

			tzmin = ( box.min.z - origin.z ) * invdirz;
			tzmax = ( box.max.z - origin.z ) * invdirz;

		} else {

			tzmin = ( box.max.z - origin.z ) * invdirz;
			tzmax = ( box.min.z - origin.z ) * invdirz;

		}

		if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

		if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

		if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

		//return point closest to the ray (positive side)

		if ( tmax < 0 ) return null;

		return this.at( tmin >= 0 ? tmin : tmax, target );

	}

	intersectsBox( box ) {

		return this.intersectBox( box, _vector$a ) !== null;

	}

	intersectTriangle( a, b, c, backfaceCulling, target ) {

		// Compute the offset origin, edges, and normal.

		// from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

		_edge1.subVectors( b, a );
		_edge2.subVectors( c, a );
		_normal$1.crossVectors( _edge1, _edge2 );

		// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
		// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
		//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
		//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
		//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
		let DdN = this.direction.dot( _normal$1 );
		let sign;

		if ( DdN > 0 ) {

			if ( backfaceCulling ) return null;
			sign = 1;

		} else if ( DdN < 0 ) {

			sign = - 1;
			DdN = - DdN;

		} else {

			return null;

		}

		_diff.subVectors( this.origin, a );
		const DdQxE2 = sign * this.direction.dot( _edge2.crossVectors( _diff, _edge2 ) );

		// b1 < 0, no intersection
		if ( DdQxE2 < 0 ) {

			return null;

		}

		const DdE1xQ = sign * this.direction.dot( _edge1.cross( _diff ) );

		// b2 < 0, no intersection
		if ( DdE1xQ < 0 ) {

			return null;

		}

		// b1+b2 > 1, no intersection
		if ( DdQxE2 + DdE1xQ > DdN ) {

			return null;

		}

		// Line intersects triangle, check if ray does.
		const QdN = - sign * _diff.dot( _normal$1 );

		// t < 0, no intersection
		if ( QdN < 0 ) {

			return null;

		}

		// Ray intersects triangle.
		return this.at( QdN / DdN, target );

	}

	applyMatrix4( matrix4 ) {

		this.origin.applyMatrix4( matrix4 );
		this.direction.transformDirection( matrix4 );

		return this;

	}

	equals( ray ) {

		return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

class Matrix4 {

	constructor() {

		Matrix4.prototype.isMatrix4 = true;

		this.elements = [

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		const te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	}

	identity() {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	clone() {

		return new Matrix4().fromArray( this.elements );

	}

	copy( m ) {

		const te = this.elements;
		const me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
		te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

		return this;

	}

	copyPosition( m ) {

		const te = this.elements, me = m.elements;

		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];

		return this;

	}

	setFromMatrix3( m ) {

		const me = m.elements;

		this.set(

			me[ 0 ], me[ 3 ], me[ 6 ], 0,
			me[ 1 ], me[ 4 ], me[ 7 ], 0,
			me[ 2 ], me[ 5 ], me[ 8 ], 0,
			0, 0, 0, 1

		);

		return this;

	}

	extractBasis( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrixColumn( this, 0 );
		yAxis.setFromMatrixColumn( this, 1 );
		zAxis.setFromMatrixColumn( this, 2 );

		return this;

	}

	makeBasis( xAxis, yAxis, zAxis ) {

		this.set(
			xAxis.x, yAxis.x, zAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, 0,
			0, 0, 0, 1
		);

		return this;

	}

	extractRotation( m ) {

		// this method does not support reflection matrices

		const te = this.elements;
		const me = m.elements;

		const scaleX = 1 / _v1$5.setFromMatrixColumn( m, 0 ).length();
		const scaleY = 1 / _v1$5.setFromMatrixColumn( m, 1 ).length();
		const scaleZ = 1 / _v1$5.setFromMatrixColumn( m, 2 ).length();

		te[ 0 ] = me[ 0 ] * scaleX;
		te[ 1 ] = me[ 1 ] * scaleX;
		te[ 2 ] = me[ 2 ] * scaleX;
		te[ 3 ] = 0;

		te[ 4 ] = me[ 4 ] * scaleY;
		te[ 5 ] = me[ 5 ] * scaleY;
		te[ 6 ] = me[ 6 ] * scaleY;
		te[ 7 ] = 0;

		te[ 8 ] = me[ 8 ] * scaleZ;
		te[ 9 ] = me[ 9 ] * scaleZ;
		te[ 10 ] = me[ 10 ] * scaleZ;
		te[ 11 ] = 0;

		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	}

	makeRotationFromEuler( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

		}

		const te = this.elements;

		const x = euler.x, y = euler.y, z = euler.z;
		const a = Math.cos( x ), b = Math.sin( x );
		const c = Math.cos( y ), d = Math.sin( y );
		const e = Math.cos( z ), f = Math.sin( z );

		if ( euler.order === 'XYZ' ) {

			const ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = - c * f;
			te[ 8 ] = d;

			te[ 1 ] = af + be * d;
			te[ 5 ] = ae - bf * d;
			te[ 9 ] = - b * c;

			te[ 2 ] = bf - ae * d;
			te[ 6 ] = be + af * d;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YXZ' ) {

			const ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce + df * b;
			te[ 4 ] = de * b - cf;
			te[ 8 ] = a * d;

			te[ 1 ] = a * f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b;

			te[ 2 ] = cf * b - de;
			te[ 6 ] = df + ce * b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZXY' ) {

			const ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce - df * b;
			te[ 4 ] = - a * f;
			te[ 8 ] = de + cf * b;

			te[ 1 ] = cf + de * b;
			te[ 5 ] = a * e;
			te[ 9 ] = df - ce * b;

			te[ 2 ] = - a * d;
			te[ 6 ] = b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZYX' ) {

			const ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = be * d - af;
			te[ 8 ] = ae * d + bf;

			te[ 1 ] = c * f;
			te[ 5 ] = bf * d + ae;
			te[ 9 ] = af * d - be;

			te[ 2 ] = - d;
			te[ 6 ] = b * c;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YZX' ) {

			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = bd - ac * f;
			te[ 8 ] = bc * f + ad;

			te[ 1 ] = f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b * e;

			te[ 2 ] = - d * e;
			te[ 6 ] = ad * f + bc;
			te[ 10 ] = ac - bd * f;

		} else if ( euler.order === 'XZY' ) {

			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = - f;
			te[ 8 ] = d * e;

			te[ 1 ] = ac * f + bd;
			te[ 5 ] = a * e;
			te[ 9 ] = ad * f - bc;

			te[ 2 ] = bc * f - ad;
			te[ 6 ] = b * e;
			te[ 10 ] = bd * f + ac;

		}

		// bottom row
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// last column
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	}

	makeRotationFromQuaternion( q ) {

		return this.compose( _zero, q, _one );

	}

	lookAt( eye, target, up ) {

		const te = this.elements;

		_z.subVectors( eye, target );

		if ( _z.lengthSq() === 0 ) {

			// eye and target are in the same position

			_z.z = 1;

		}

		_z.normalize();
		_x.crossVectors( up, _z );

		if ( _x.lengthSq() === 0 ) {

			// up and z are parallel

			if ( Math.abs( up.z ) === 1 ) {

				_z.x += 0.0001;

			} else {

				_z.z += 0.0001;

			}

			_z.normalize();
			_x.crossVectors( up, _z );

		}

		_x.normalize();
		_y.crossVectors( _z, _x );

		te[ 0 ] = _x.x; te[ 4 ] = _y.x; te[ 8 ] = _z.x;
		te[ 1 ] = _x.y; te[ 5 ] = _y.y; te[ 9 ] = _z.y;
		te[ 2 ] = _x.z; te[ 6 ] = _y.z; te[ 10 ] = _z.z;

		return this;

	}

	multiply( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	}

	premultiply( m ) {

		return this.multiplyMatrices( m, this );

	}

	multiplyMatrices( a, b ) {

		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		const a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		const a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		const a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		const b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		const b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		const b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		const b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	}

	multiplyScalar( s ) {

		const te = this.elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;

	}

	determinant() {

		const te = this.elements;

		const n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
		const n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
		const n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
		const n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n41 * (
				+ n14 * n23 * n32
				 - n13 * n24 * n32
				 - n14 * n22 * n33
				 + n12 * n24 * n33
				 + n13 * n22 * n34
				 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
				 - n11 * n24 * n33
				 + n14 * n21 * n33
				 - n13 * n21 * n34
				 + n13 * n24 * n31
				 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
				 - n11 * n22 * n34
				 - n14 * n21 * n32
				 + n12 * n21 * n34
				 + n14 * n22 * n31
				 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
				 - n11 * n23 * n32
				 + n11 * n22 * n33
				 + n13 * n21 * n32
				 - n12 * n21 * n33
				 + n12 * n23 * n31
			)

		);

	}

	transpose() {

		const te = this.elements;
		let tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		return this;

	}

	setPosition( x, y, z ) {

		const te = this.elements;

		if ( x.isVector3 ) {

			te[ 12 ] = x.x;
			te[ 13 ] = x.y;
			te[ 14 ] = x.z;

		} else {

			te[ 12 ] = x;
			te[ 13 ] = y;
			te[ 14 ] = z;

		}

		return this;

	}

	invert() {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		const te = this.elements,

			n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ], n41 = te[ 3 ],
			n12 = te[ 4 ], n22 = te[ 5 ], n32 = te[ 6 ], n42 = te[ 7 ],
			n13 = te[ 8 ], n23 = te[ 9 ], n33 = te[ 10 ], n43 = te[ 11 ],
			n14 = te[ 12 ], n24 = te[ 13 ], n34 = te[ 14 ], n44 = te[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		const detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

		return this;

	}

	scale( v ) {

		const te = this.elements;
		const x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	}

	getMaxScaleOnAxis() {

		const te = this.elements;

		const scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
		const scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
		const scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

		return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

	}

	makeTranslation( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationX( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationY( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1

		);

		return this;

	}

	makeRotationZ( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationAxis( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		const c = Math.cos( angle );
		const s = Math.sin( angle );
		const t = 1 - c;
		const x = axis.x, y = axis.y, z = axis.z;
		const tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeScale( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeShear( xy, xz, yx, yz, zx, zy ) {

		this.set(

			1, yx, zx, 0,
			xy, 1, zy, 0,
			xz, yz, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	compose( position, quaternion, scale ) {

		const te = this.elements;

		const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		const x2 = x + x,	y2 = y + y, z2 = z + z;
		const xx = x * x2, xy = x * y2, xz = x * z2;
		const yy = y * y2, yz = y * z2, zz = z * z2;
		const wx = w * x2, wy = w * y2, wz = w * z2;

		const sx = scale.x, sy = scale.y, sz = scale.z;

		te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		te[ 1 ] = ( xy + wz ) * sx;
		te[ 2 ] = ( xz - wy ) * sx;
		te[ 3 ] = 0;

		te[ 4 ] = ( xy - wz ) * sy;
		te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		te[ 6 ] = ( yz + wx ) * sy;
		te[ 7 ] = 0;

		te[ 8 ] = ( xz + wy ) * sz;
		te[ 9 ] = ( yz - wx ) * sz;
		te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		te[ 11 ] = 0;

		te[ 12 ] = position.x;
		te[ 13 ] = position.y;
		te[ 14 ] = position.z;
		te[ 15 ] = 1;

		return this;

	}

	decompose( position, quaternion, scale ) {

		const te = this.elements;

		let sx = _v1$5.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
		const sy = _v1$5.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
		const sz = _v1$5.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

		// if determine is negative, we need to invert one scale
		const det = this.determinant();
		if ( det < 0 ) sx = - sx;

		position.x = te[ 12 ];
		position.y = te[ 13 ];
		position.z = te[ 14 ];

		// scale the rotation part
		_m1$2.copy( this );

		const invSX = 1 / sx;
		const invSY = 1 / sy;
		const invSZ = 1 / sz;

		_m1$2.elements[ 0 ] *= invSX;
		_m1$2.elements[ 1 ] *= invSX;
		_m1$2.elements[ 2 ] *= invSX;

		_m1$2.elements[ 4 ] *= invSY;
		_m1$2.elements[ 5 ] *= invSY;
		_m1$2.elements[ 6 ] *= invSY;

		_m1$2.elements[ 8 ] *= invSZ;
		_m1$2.elements[ 9 ] *= invSZ;
		_m1$2.elements[ 10 ] *= invSZ;

		quaternion.setFromRotationMatrix( _m1$2 );

		scale.x = sx;
		scale.y = sy;
		scale.z = sz;

		return this;

	}

	makePerspective( left, right, top, bottom, near, far ) {

		if ( far === undefined ) {

			console.warn( 'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

		}

		const te = this.elements;
		const x = 2 * near / ( right - left );
		const y = 2 * near / ( top - bottom );

		const a = ( right + left ) / ( right - left );
		const b = ( top + bottom ) / ( top - bottom );
		const c = - ( far + near ) / ( far - near );
		const d = - 2 * far * near / ( far - near );

		te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
		te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

		return this;

	}

	makeOrthographic( left, right, top, bottom, near, far ) {

		const te = this.elements;
		const w = 1.0 / ( right - left );
		const h = 1.0 / ( top - bottom );
		const p = 1.0 / ( far - near );

		const x = ( right + left ) * w;
		const y = ( top + bottom ) * h;
		const z = ( far + near ) * p;

		te[ 0 ] = 2 * w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
		te[ 1 ] = 0;	te[ 5 ] = 2 * h;	te[ 9 ] = 0;	te[ 13 ] = - y;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 * p;	te[ 14 ] = - z;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

		return this;

	}

	equals( matrix ) {

		const te = this.elements;
		const me = matrix.elements;

		for ( let i = 0; i < 16; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		return true;

	}

	fromArray( array, offset = 0 ) {

		for ( let i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}

	toArray( array = [], offset = 0 ) {

		const te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	}

}

const _v1$5 = /*@__PURE__*/ new Vector3();
const _m1$2 = /*@__PURE__*/ new Matrix4();
const _zero = /*@__PURE__*/ new Vector3( 0, 0, 0 );
const _one = /*@__PURE__*/ new Vector3( 1, 1, 1 );
const _x = /*@__PURE__*/ new Vector3();
const _y = /*@__PURE__*/ new Vector3();
const _z = /*@__PURE__*/ new Vector3();

const _matrix$1 = /*@__PURE__*/ new Matrix4();
const _quaternion$3 = /*@__PURE__*/ new Quaternion();

class Euler {

	constructor( x = 0, y = 0, z = 0, order = Euler.DefaultOrder ) {

		this.isEuler = true;

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;

	}

	get x() {

		return this._x;

	}

	set x( value ) {

		this._x = value;
		this._onChangeCallback();

	}

	get y() {

		return this._y;

	}

	set y( value ) {

		this._y = value;
		this._onChangeCallback();

	}

	get z() {

		return this._z;

	}

	set z( value ) {

		this._z = value;
		this._onChangeCallback();

	}

	get order() {

		return this._order;

	}

	set order( value ) {

		this._order = value;
		this._onChangeCallback();

	}

	set( x, y, z, order = this._order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;

		this._onChangeCallback();

		return this;

	}

	clone() {

		return new this.constructor( this._x, this._y, this._z, this._order );

	}

	copy( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this._onChangeCallback();

		return this;

	}

	setFromRotationMatrix( m, order = this._order, update = true ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = m.elements;
		const m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		const m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		const m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		switch ( order ) {

			case 'XYZ':

				this._y = Math.asin( clamp( m13, - 1, 1 ) );

				if ( Math.abs( m13 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m33 );
					this._z = Math.atan2( - m12, m11 );

				} else {

					this._x = Math.atan2( m32, m22 );
					this._z = 0;

				}

				break;

			case 'YXZ':

				this._x = Math.asin( - clamp( m23, - 1, 1 ) );

				if ( Math.abs( m23 ) < 0.9999999 ) {

					this._y = Math.atan2( m13, m33 );
					this._z = Math.atan2( m21, m22 );

				} else {

					this._y = Math.atan2( - m31, m11 );
					this._z = 0;

				}

				break;

			case 'ZXY':

				this._x = Math.asin( clamp( m32, - 1, 1 ) );

				if ( Math.abs( m32 ) < 0.9999999 ) {

					this._y = Math.atan2( - m31, m33 );
					this._z = Math.atan2( - m12, m22 );

				} else {

					this._y = 0;
					this._z = Math.atan2( m21, m11 );

				}

				break;

			case 'ZYX':

				this._y = Math.asin( - clamp( m31, - 1, 1 ) );

				if ( Math.abs( m31 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m33 );
					this._z = Math.atan2( m21, m11 );

				} else {

					this._x = 0;
					this._z = Math.atan2( - m12, m22 );

				}

				break;

			case 'YZX':

				this._z = Math.asin( clamp( m21, - 1, 1 ) );

				if ( Math.abs( m21 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m22 );
					this._y = Math.atan2( - m31, m11 );

				} else {

					this._x = 0;
					this._y = Math.atan2( m13, m33 );

				}

				break;

			case 'XZY':

				this._z = Math.asin( - clamp( m12, - 1, 1 ) );

				if ( Math.abs( m12 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m22 );
					this._y = Math.atan2( m13, m11 );

				} else {

					this._x = Math.atan2( - m23, m33 );
					this._y = 0;

				}

				break;

			default:

				console.warn( 'THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order );

		}

		this._order = order;

		if ( update === true ) this._onChangeCallback();

		return this;

	}

	setFromQuaternion( q, order, update ) {

		_matrix$1.makeRotationFromQuaternion( q );

		return this.setFromRotationMatrix( _matrix$1, order, update );

	}

	setFromVector3( v, order = this._order ) {

		return this.set( v.x, v.y, v.z, order );

	}

	reorder( newOrder ) {

		// WARNING: this discards revolution information -bhouston

		_quaternion$3.setFromEuler( this );

		return this.setFromQuaternion( _quaternion$3, newOrder );

	}

	equals( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	}

	fromArray( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this._onChangeCallback();

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._order;

		return array;

	}

	_onChange( callback ) {

		this._onChangeCallback = callback;

		return this;

	}

	_onChangeCallback() {}

	*[ Symbol.iterator ]() {

		yield this._x;
		yield this._y;
		yield this._z;
		yield this._order;

	}

	// @deprecated since r138, 02cf0df1cb4575d5842fef9c85bb5a89fe020d53

	toVector3() {

		console.error( 'THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead' );

	}

}

Euler.DefaultOrder = 'XYZ';
Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

class Layers {

	constructor() {

		this.mask = 1 | 0;

	}

	set( channel ) {

		this.mask = ( 1 << channel | 0 ) >>> 0;

	}

	enable( channel ) {

		this.mask |= 1 << channel | 0;

	}

	enableAll() {

		this.mask = 0xffffffff | 0;

	}

	toggle( channel ) {

		this.mask ^= 1 << channel | 0;

	}

	disable( channel ) {

		this.mask &= ~ ( 1 << channel | 0 );

	}

	disableAll() {

		this.mask = 0;

	}

	test( layers ) {

		return ( this.mask & layers.mask ) !== 0;

	}

	isEnabled( channel ) {

		return ( this.mask & ( 1 << channel | 0 ) ) !== 0;

	}

}

let _object3DId = 0;

const _v1$4 = /*@__PURE__*/ new Vector3();
const _q1 = /*@__PURE__*/ new Quaternion();
const _m1$1 = /*@__PURE__*/ new Matrix4();
const _target = /*@__PURE__*/ new Vector3();

const _position$3 = /*@__PURE__*/ new Vector3();
const _scale$2 = /*@__PURE__*/ new Vector3();
const _quaternion$2 = /*@__PURE__*/ new Quaternion();

const _xAxis = /*@__PURE__*/ new Vector3( 1, 0, 0 );
const _yAxis = /*@__PURE__*/ new Vector3( 0, 1, 0 );
const _zAxis = /*@__PURE__*/ new Vector3( 0, 0, 1 );

const _addedEvent = { type: 'added' };
const _removedEvent = { type: 'removed' };

class Object3D extends EventDispatcher {

	constructor() {

		super();

		this.isObject3D = true;

		Object.defineProperty( this, 'id', { value: _object3DId ++ } );

		this.uuid = generateUUID();

		this.name = '';
		this.type = 'Object3D';

		this.parent = null;
		this.children = [];

		this.up = Object3D.DefaultUp.clone();

		const position = new Vector3();
		const rotation = new Euler();
		const quaternion = new Quaternion();
		const scale = new Vector3( 1, 1, 1 );

		function onRotationChange() {

			quaternion.setFromEuler( rotation, false );

		}

		function onQuaternionChange() {

			rotation.setFromQuaternion( quaternion, undefined, false );

		}

		rotation._onChange( onRotationChange );
		quaternion._onChange( onQuaternionChange );

		Object.defineProperties( this, {
			position: {
				configurable: true,
				enumerable: true,
				value: position
			},
			rotation: {
				configurable: true,
				enumerable: true,
				value: rotation
			},
			quaternion: {
				configurable: true,
				enumerable: true,
				value: quaternion
			},
			scale: {
				configurable: true,
				enumerable: true,
				value: scale
			},
			modelViewMatrix: {
				value: new Matrix4()
			},
			normalMatrix: {
				value: new Matrix3()
			}
		} );

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
		this.matrixWorldNeedsUpdate = false;

		this.layers = new Layers();
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

		this.animations = [];

		this.userData = {};

	}

	onBeforeRender( /* renderer, scene, camera, geometry, material, group */ ) {}

	onAfterRender( /* renderer, scene, camera, geometry, material, group */ ) {}

	applyMatrix4( matrix ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		this.matrix.premultiply( matrix );

		this.matrix.decompose( this.position, this.quaternion, this.scale );

	}

	applyQuaternion( q ) {

		this.quaternion.premultiply( q );

		return this;

	}

	setRotationFromAxisAngle( axis, angle ) {

		// assumes axis is normalized

		this.quaternion.setFromAxisAngle( axis, angle );

	}

	setRotationFromEuler( euler ) {

		this.quaternion.setFromEuler( euler, true );

	}

	setRotationFromMatrix( m ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix( m );

	}

	setRotationFromQuaternion( q ) {

		// assumes q is normalized

		this.quaternion.copy( q );

	}

	rotateOnAxis( axis, angle ) {

		// rotate object on axis in object space
		// axis is assumed to be normalized

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.multiply( _q1 );

		return this;

	}

	rotateOnWorldAxis( axis, angle ) {

		// rotate object on axis in world space
		// axis is assumed to be normalized
		// method assumes no rotated parent

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.premultiply( _q1 );

		return this;

	}

	rotateX( angle ) {

		return this.rotateOnAxis( _xAxis, angle );

	}

	rotateY( angle ) {

		return this.rotateOnAxis( _yAxis, angle );

	}

	rotateZ( angle ) {

		return this.rotateOnAxis( _zAxis, angle );

	}

	translateOnAxis( axis, distance ) {

		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		_v1$4.copy( axis ).applyQuaternion( this.quaternion );

		this.position.add( _v1$4.multiplyScalar( distance ) );

		return this;

	}

	translateX( distance ) {

		return this.translateOnAxis( _xAxis, distance );

	}

	translateY( distance ) {

		return this.translateOnAxis( _yAxis, distance );

	}

	translateZ( distance ) {

		return this.translateOnAxis( _zAxis, distance );

	}

	localToWorld( vector ) {

		return vector.applyMatrix4( this.matrixWorld );

	}

	worldToLocal( vector ) {

		return vector.applyMatrix4( _m1$1.copy( this.matrixWorld ).invert() );

	}

	lookAt( x, y, z ) {

		// This method does not support objects having non-uniformly-scaled parent(s)

		if ( x.isVector3 ) {

			_target.copy( x );

		} else {

			_target.set( x, y, z );

		}

		const parent = this.parent;

		this.updateWorldMatrix( true, false );

		_position$3.setFromMatrixPosition( this.matrixWorld );

		if ( this.isCamera || this.isLight ) {

			_m1$1.lookAt( _position$3, _target, this.up );

		} else {

			_m1$1.lookAt( _target, _position$3, this.up );

		}

		this.quaternion.setFromRotationMatrix( _m1$1 );

		if ( parent ) {

			_m1$1.extractRotation( parent.matrixWorld );
			_q1.setFromRotationMatrix( _m1$1 );
			this.quaternion.premultiply( _q1.invert() );

		}

	}

	add( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		if ( object === this ) {

			console.error( 'THREE.Object3D.add: object can\'t be added as a child of itself.', object );
			return this;

		}

		if ( object && object.isObject3D ) {

			if ( object.parent !== null ) {

				object.parent.remove( object );

			}

			object.parent = this;
			this.children.push( object );

			object.dispatchEvent( _addedEvent );

		} else {

			console.error( 'THREE.Object3D.add: object not an instance of THREE.Object3D.', object );

		}

		return this;

	}

	remove( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.remove( arguments[ i ] );

			}

			return this;

		}

		const index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = null;
			this.children.splice( index, 1 );

			object.dispatchEvent( _removedEvent );

		}

		return this;

	}

	removeFromParent() {

		const parent = this.parent;

		if ( parent !== null ) {

			parent.remove( this );

		}

		return this;

	}

	clear() {

		for ( let i = 0; i < this.children.length; i ++ ) {

			const object = this.children[ i ];

			object.parent = null;

			object.dispatchEvent( _removedEvent );

		}

		this.children.length = 0;

		return this;


	}

	attach( object ) {

		// adds object as a child of this, while maintaining the object's world transform

		// Note: This method does not support scene graphs having non-uniformly-scaled nodes(s)

		this.updateWorldMatrix( true, false );

		_m1$1.copy( this.matrixWorld ).invert();

		if ( object.parent !== null ) {

			object.parent.updateWorldMatrix( true, false );

			_m1$1.multiply( object.parent.matrixWorld );

		}

		object.applyMatrix4( _m1$1 );

		this.add( object );

		object.updateWorldMatrix( false, true );

		return this;

	}

	getObjectById( id ) {

		return this.getObjectByProperty( 'id', id );

	}

	getObjectByName( name ) {

		return this.getObjectByProperty( 'name', name );

	}

	getObjectByProperty( name, value ) {

		if ( this[ name ] === value ) return this;

		for ( let i = 0, l = this.children.length; i < l; i ++ ) {

			const child = this.children[ i ];
			const object = child.getObjectByProperty( name, value );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	}

	getWorldPosition( target ) {

		this.updateWorldMatrix( true, false );

		return target.setFromMatrixPosition( this.matrixWorld );

	}

	getWorldQuaternion( target ) {

		this.updateWorldMatrix( true, false );

		this.matrixWorld.decompose( _position$3, target, _scale$2 );

		return target;

	}

	getWorldScale( target ) {

		this.updateWorldMatrix( true, false );

		this.matrixWorld.decompose( _position$3, _quaternion$2, target );

		return target;

	}

	getWorldDirection( target ) {

		this.updateWorldMatrix( true, false );

		const e = this.matrixWorld.elements;

		return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

	}

	raycast( /* raycaster, intersects */ ) {}

	traverse( callback ) {

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverse( callback );

		}

	}

	traverseVisible( callback ) {

		if ( this.visible === false ) return;

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverseVisible( callback );

		}

	}

	traverseAncestors( callback ) {

		const parent = this.parent;

		if ( parent !== null ) {

			callback( parent );

			parent.traverseAncestors( callback );

		}

	}

	updateMatrix() {

		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.matrixWorldNeedsUpdate = true;

	}

	updateMatrixWorld( force ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate || force ) {

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].updateMatrixWorld( force );

		}

	}

	updateWorldMatrix( updateParents, updateChildren ) {

		const parent = this.parent;

		if ( updateParents === true && parent !== null ) {

			parent.updateWorldMatrix( true, false );

		}

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.parent === null ) {

			this.matrixWorld.copy( this.matrix );

		} else {

			this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

		}

		// update children

		if ( updateChildren === true ) {

			const children = this.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateWorldMatrix( false, true );

			}

		}

	}

	toJSON( meta ) {

		// meta is a string when called from JSON.stringify
		const isRootObject = ( meta === undefined || typeof meta === 'string' );

		const output = {};

		// meta is a hash used to collect geometries, materials.
		// not providing it implies that this is the root object
		// being serialized.
		if ( isRootObject ) {

			// initialize meta obj
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {},
				skeletons: {},
				animations: {},
				nodes: {}
			};

			output.metadata = {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			};

		}

		// standard Object3D serialization

		const object = {};

		object.uuid = this.uuid;
		object.type = this.type;

		if ( this.name !== '' ) object.name = this.name;
		if ( this.castShadow === true ) object.castShadow = true;
		if ( this.receiveShadow === true ) object.receiveShadow = true;
		if ( this.visible === false ) object.visible = false;
		if ( this.frustumCulled === false ) object.frustumCulled = false;
		if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
		if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

		object.layers = this.layers.mask;
		object.matrix = this.matrix.toArray();

		if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

		// object specific properties

		if ( this.isInstancedMesh ) {

			object.type = 'InstancedMesh';
			object.count = this.count;
			object.instanceMatrix = this.instanceMatrix.toJSON();
			if ( this.instanceColor !== null ) object.instanceColor = this.instanceColor.toJSON();

		}

		//

		function serialize( library, element ) {

			if ( library[ element.uuid ] === undefined ) {

				library[ element.uuid ] = element.toJSON( meta );

			}

			return element.uuid;

		}

		if ( this.isScene ) {

			if ( this.background ) {

				if ( this.background.isColor ) {

					object.background = this.background.toJSON();

				} else if ( this.background.isTexture ) {

					object.background = this.background.toJSON( meta ).uuid;

				}

			}

			if ( this.environment && this.environment.isTexture ) {

				object.environment = this.environment.toJSON( meta ).uuid;

			}

		} else if ( this.isMesh || this.isLine || this.isPoints ) {

			object.geometry = serialize( meta.geometries, this.geometry );

			const parameters = this.geometry.parameters;

			if ( parameters !== undefined && parameters.shapes !== undefined ) {

				const shapes = parameters.shapes;

				if ( Array.isArray( shapes ) ) {

					for ( let i = 0, l = shapes.length; i < l; i ++ ) {

						const shape = shapes[ i ];

						serialize( meta.shapes, shape );

					}

				} else {

					serialize( meta.shapes, shapes );

				}

			}

		}

		if ( this.isSkinnedMesh ) {

			object.bindMode = this.bindMode;
			object.bindMatrix = this.bindMatrix.toArray();

			if ( this.skeleton !== undefined ) {

				serialize( meta.skeletons, this.skeleton );

				object.skeleton = this.skeleton.uuid;

			}

		}

		if ( this.material !== undefined ) {

			if ( Array.isArray( this.material ) ) {

				const uuids = [];

				for ( let i = 0, l = this.material.length; i < l; i ++ ) {

					uuids.push( serialize( meta.materials, this.material[ i ] ) );

				}

				object.material = uuids;

			} else {

				object.material = serialize( meta.materials, this.material );

			}

		}

		//

		if ( this.children.length > 0 ) {

			object.children = [];

			for ( let i = 0; i < this.children.length; i ++ ) {

				object.children.push( this.children[ i ].toJSON( meta ).object );

			}

		}

		//

		if ( this.animations.length > 0 ) {

			object.animations = [];

			for ( let i = 0; i < this.animations.length; i ++ ) {

				const animation = this.animations[ i ];

				object.animations.push( serialize( meta.animations, animation ) );

			}

		}

		if ( isRootObject ) {

			const geometries = extractFromCache( meta.geometries );
			const materials = extractFromCache( meta.materials );
			const textures = extractFromCache( meta.textures );
			const images = extractFromCache( meta.images );
			const shapes = extractFromCache( meta.shapes );
			const skeletons = extractFromCache( meta.skeletons );
			const animations = extractFromCache( meta.animations );
			const nodes = extractFromCache( meta.nodes );

			if ( geometries.length > 0 ) output.geometries = geometries;
			if ( materials.length > 0 ) output.materials = materials;
			if ( textures.length > 0 ) output.textures = textures;
			if ( images.length > 0 ) output.images = images;
			if ( shapes.length > 0 ) output.shapes = shapes;
			if ( skeletons.length > 0 ) output.skeletons = skeletons;
			if ( animations.length > 0 ) output.animations = animations;
			if ( nodes.length > 0 ) output.nodes = nodes;

		}

		output.object = object;

		return output;

		// extract data from the cache hash
		// remove metadata on each item
		// and return as array
		function extractFromCache( cache ) {

			const values = [];
			for ( const key in cache ) {

				const data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}

			return values;

		}

	}

	clone( recursive ) {

		return new this.constructor().copy( this, recursive );

	}

	copy( source, recursive = true ) {

		this.name = source.name;

		this.up.copy( source.up );

		this.position.copy( source.position );
		this.rotation.order = source.rotation.order;
		this.quaternion.copy( source.quaternion );
		this.scale.copy( source.scale );

		this.matrix.copy( source.matrix );
		this.matrixWorld.copy( source.matrixWorld );

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

		this.layers.mask = source.layers.mask;
		this.visible = source.visible;

		this.castShadow = source.castShadow;
		this.receiveShadow = source.receiveShadow;

		this.frustumCulled = source.frustumCulled;
		this.renderOrder = source.renderOrder;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		if ( recursive === true ) {

			for ( let i = 0; i < source.children.length; i ++ ) {

				const child = source.children[ i ];
				this.add( child.clone() );

			}

		}

		return this;

	}

}

Object3D.DefaultUp = /*@__PURE__*/ new Vector3( 0, 1, 0 );
Object3D.DefaultMatrixAutoUpdate = true;

const _v0$1 = /*@__PURE__*/ new Vector3();
const _v1$3 = /*@__PURE__*/ new Vector3();
const _v2$2 = /*@__PURE__*/ new Vector3();
const _v3$1 = /*@__PURE__*/ new Vector3();

const _vab = /*@__PURE__*/ new Vector3();
const _vac = /*@__PURE__*/ new Vector3();
const _vbc = /*@__PURE__*/ new Vector3();
const _vap = /*@__PURE__*/ new Vector3();
const _vbp = /*@__PURE__*/ new Vector3();
const _vcp = /*@__PURE__*/ new Vector3();

class Triangle {

	constructor( a = new Vector3(), b = new Vector3(), c = new Vector3() ) {

		this.a = a;
		this.b = b;
		this.c = c;

	}

	static getNormal( a, b, c, target ) {

		target.subVectors( c, b );
		_v0$1.subVectors( a, b );
		target.cross( _v0$1 );

		const targetLengthSq = target.lengthSq();
		if ( targetLengthSq > 0 ) {

			return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

		}

		return target.set( 0, 0, 0 );

	}

	// static/instance method to calculate barycentric coordinates
	// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
	static getBarycoord( point, a, b, c, target ) {

		_v0$1.subVectors( c, a );
		_v1$3.subVectors( b, a );
		_v2$2.subVectors( point, a );

		const dot00 = _v0$1.dot( _v0$1 );
		const dot01 = _v0$1.dot( _v1$3 );
		const dot02 = _v0$1.dot( _v2$2 );
		const dot11 = _v1$3.dot( _v1$3 );
		const dot12 = _v1$3.dot( _v2$2 );

		const denom = ( dot00 * dot11 - dot01 * dot01 );

		// collinear or singular triangle
		if ( denom === 0 ) {

			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return target.set( - 2, - 1, - 1 );

		}

		const invDenom = 1 / denom;
		const u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		const v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycentric coordinates must always sum to 1
		return target.set( 1 - u - v, v, u );

	}

	static containsPoint( point, a, b, c ) {

		this.getBarycoord( point, a, b, c, _v3$1 );

		return ( _v3$1.x >= 0 ) && ( _v3$1.y >= 0 ) && ( ( _v3$1.x + _v3$1.y ) <= 1 );

	}

	static getUV( point, p1, p2, p3, uv1, uv2, uv3, target ) {

		this.getBarycoord( point, p1, p2, p3, _v3$1 );

		target.set( 0, 0 );
		target.addScaledVector( uv1, _v3$1.x );
		target.addScaledVector( uv2, _v3$1.y );
		target.addScaledVector( uv3, _v3$1.z );

		return target;

	}

	static isFrontFacing( a, b, c, direction ) {

		_v0$1.subVectors( c, b );
		_v1$3.subVectors( a, b );

		// strictly front facing
		return ( _v0$1.cross( _v1$3 ).dot( direction ) < 0 ) ? true : false;

	}

	set( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;

	}

	setFromPointsAndIndices( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;

	}

	setFromAttributeAndIndices( attribute, i0, i1, i2 ) {

		this.a.fromBufferAttribute( attribute, i0 );
		this.b.fromBufferAttribute( attribute, i1 );
		this.c.fromBufferAttribute( attribute, i2 );

		return this;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;

	}

	getArea() {

		_v0$1.subVectors( this.c, this.b );
		_v1$3.subVectors( this.a, this.b );

		return _v0$1.cross( _v1$3 ).length() * 0.5;

	}

	getMidpoint( target ) {

		return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

	}

	getNormal( target ) {

		return Triangle.getNormal( this.a, this.b, this.c, target );

	}

	getPlane( target ) {

		return target.setFromCoplanarPoints( this.a, this.b, this.c );

	}

	getBarycoord( point, target ) {

		return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

	}

	getUV( point, uv1, uv2, uv3, target ) {

		return Triangle.getUV( point, this.a, this.b, this.c, uv1, uv2, uv3, target );

	}

	containsPoint( point ) {

		return Triangle.containsPoint( point, this.a, this.b, this.c );

	}

	isFrontFacing( direction ) {

		return Triangle.isFrontFacing( this.a, this.b, this.c, direction );

	}

	intersectsBox( box ) {

		return box.intersectsTriangle( this );

	}

	closestPointToPoint( p, target ) {

		const a = this.a, b = this.b, c = this.c;
		let v, w;

		// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
		// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
		// under the accompanying license; see chapter 5.1.5 for detailed explanation.
		// basically, we're distinguishing which of the voronoi regions of the triangle
		// the point lies in with the minimum amount of redundant computation.

		_vab.subVectors( b, a );
		_vac.subVectors( c, a );
		_vap.subVectors( p, a );
		const d1 = _vab.dot( _vap );
		const d2 = _vac.dot( _vap );
		if ( d1 <= 0 && d2 <= 0 ) {

			// vertex region of A; barycentric coords (1, 0, 0)
			return target.copy( a );

		}

		_vbp.subVectors( p, b );
		const d3 = _vab.dot( _vbp );
		const d4 = _vac.dot( _vbp );
		if ( d3 >= 0 && d4 <= d3 ) {

			// vertex region of B; barycentric coords (0, 1, 0)
			return target.copy( b );

		}

		const vc = d1 * d4 - d3 * d2;
		if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

			v = d1 / ( d1 - d3 );
			// edge region of AB; barycentric coords (1-v, v, 0)
			return target.copy( a ).addScaledVector( _vab, v );

		}

		_vcp.subVectors( p, c );
		const d5 = _vab.dot( _vcp );
		const d6 = _vac.dot( _vcp );
		if ( d6 >= 0 && d5 <= d6 ) {

			// vertex region of C; barycentric coords (0, 0, 1)
			return target.copy( c );

		}

		const vb = d5 * d2 - d1 * d6;
		if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

			w = d2 / ( d2 - d6 );
			// edge region of AC; barycentric coords (1-w, 0, w)
			return target.copy( a ).addScaledVector( _vac, w );

		}

		const va = d3 * d6 - d5 * d4;
		if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

			_vbc.subVectors( c, b );
			w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
			// edge region of BC; barycentric coords (0, 1-w, w)
			return target.copy( b ).addScaledVector( _vbc, w ); // edge region of BC

		}

		// face region
		const denom = 1 / ( va + vb + vc );
		// u = va * denom
		v = vb * denom;
		w = vc * denom;

		return target.copy( a ).addScaledVector( _vab, v ).addScaledVector( _vac, w );

	}

	equals( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

	}

}

let materialId = 0;

class Material extends EventDispatcher {

	constructor() {

		super();

		this.isMaterial = true;

		Object.defineProperty( this, 'id', { value: materialId ++ } );

		this.uuid = generateUUID();

		this.name = '';
		this.type = 'Material';

		this.blending = NormalBlending;
		this.side = FrontSide;
		this.vertexColors = false;

		this.opacity = 1;
		this.transparent = false;

		this.blendSrc = SrcAlphaFactor;
		this.blendDst = OneMinusSrcAlphaFactor;
		this.blendEquation = AddEquation;
		this.blendSrcAlpha = null;
		this.blendDstAlpha = null;
		this.blendEquationAlpha = null;

		this.depthFunc = LessEqualDepth;
		this.depthTest = true;
		this.depthWrite = true;

		this.stencilWriteMask = 0xff;
		this.stencilFunc = AlwaysStencilFunc;
		this.stencilRef = 0;
		this.stencilFuncMask = 0xff;
		this.stencilFail = KeepStencilOp;
		this.stencilZFail = KeepStencilOp;
		this.stencilZPass = KeepStencilOp;
		this.stencilWrite = false;

		this.clippingPlanes = null;
		this.clipIntersection = false;
		this.clipShadows = false;

		this.shadowSide = null;

		this.colorWrite = true;

		this.precision = null; // override the renderer's default precision for this material

		this.polygonOffset = false;
		this.polygonOffsetFactor = 0;
		this.polygonOffsetUnits = 0;

		this.dithering = false;

		this.alphaToCoverage = false;
		this.premultipliedAlpha = false;

		this.visible = true;

		this.toneMapped = true;

		this.userData = {};

		this.version = 0;

		this._alphaTest = 0;

	}

	get alphaTest() {

		return this._alphaTest;

	}

	set alphaTest( value ) {

		if ( this._alphaTest > 0 !== value > 0 ) {

			this.version ++;

		}

		this._alphaTest = value;

	}

	onBuild( /* shaderobject, renderer */ ) {}

	onBeforeRender( /* renderer, scene, camera, geometry, object, group */ ) {}

	onBeforeCompile( /* shaderobject, renderer */ ) {}

	customProgramCacheKey() {

		return this.onBeforeCompile.toString();

	}

	setValues( values ) {

		if ( values === undefined ) return;

		for ( const key in values ) {

			const newValue = values[ key ];

			if ( newValue === undefined ) {

				console.warn( 'THREE.Material: \'' + key + '\' parameter is undefined.' );
				continue;

			}

			// for backward compatibility if shading is set in the constructor
			if ( key === 'shading' ) {

				console.warn( 'THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.' );
				this.flatShading = ( newValue === FlatShading ) ? true : false;
				continue;

			}

			const currentValue = this[ key ];

			if ( currentValue === undefined ) {

				console.warn( 'THREE.' + this.type + ': \'' + key + '\' is not a property of this material.' );
				continue;

			}

			if ( currentValue && currentValue.isColor ) {

				currentValue.set( newValue );

			} else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {

				currentValue.copy( newValue );

			} else {

				this[ key ] = newValue;

			}

		}

	}

	toJSON( meta ) {

		const isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( isRootObject ) {

			meta = {
				textures: {},
				images: {}
			};

		}

		const data = {
			metadata: {
				version: 4.5,
				type: 'Material',
				generator: 'Material.toJSON'
			}
		};

		// standard Material serialization
		data.uuid = this.uuid;
		data.type = this.type;

		if ( this.name !== '' ) data.name = this.name;

		if ( this.color && this.color.isColor ) data.color = this.color.getHex();

		if ( this.roughness !== undefined ) data.roughness = this.roughness;
		if ( this.metalness !== undefined ) data.metalness = this.metalness;

		if ( this.sheen !== undefined ) data.sheen = this.sheen;
		if ( this.sheenColor && this.sheenColor.isColor ) data.sheenColor = this.sheenColor.getHex();
		if ( this.sheenRoughness !== undefined ) data.sheenRoughness = this.sheenRoughness;
		if ( this.emissive && this.emissive.isColor ) data.emissive = this.emissive.getHex();
		if ( this.emissiveIntensity && this.emissiveIntensity !== 1 ) data.emissiveIntensity = this.emissiveIntensity;

		if ( this.specular && this.specular.isColor ) data.specular = this.specular.getHex();
		if ( this.specularIntensity !== undefined ) data.specularIntensity = this.specularIntensity;
		if ( this.specularColor && this.specularColor.isColor ) data.specularColor = this.specularColor.getHex();
		if ( this.shininess !== undefined ) data.shininess = this.shininess;
		if ( this.clearcoat !== undefined ) data.clearcoat = this.clearcoat;
		if ( this.clearcoatRoughness !== undefined ) data.clearcoatRoughness = this.clearcoatRoughness;

		if ( this.clearcoatMap && this.clearcoatMap.isTexture ) {

			data.clearcoatMap = this.clearcoatMap.toJSON( meta ).uuid;

		}

		if ( this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture ) {

			data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON( meta ).uuid;

		}

		if ( this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture ) {

			data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON( meta ).uuid;
			data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();

		}

		if ( this.iridescence !== undefined ) data.iridescence = this.iridescence;
		if ( this.iridescenceIOR !== undefined ) data.iridescenceIOR = this.iridescenceIOR;
		if ( this.iridescenceThicknessRange !== undefined ) data.iridescenceThicknessRange = this.iridescenceThicknessRange;

		if ( this.iridescenceMap && this.iridescenceMap.isTexture ) {

			data.iridescenceMap = this.iridescenceMap.toJSON( meta ).uuid;

		}

		if ( this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture ) {

			data.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON( meta ).uuid;

		}

		if ( this.map && this.map.isTexture ) data.map = this.map.toJSON( meta ).uuid;
		if ( this.matcap && this.matcap.isTexture ) data.matcap = this.matcap.toJSON( meta ).uuid;
		if ( this.alphaMap && this.alphaMap.isTexture ) data.alphaMap = this.alphaMap.toJSON( meta ).uuid;

		if ( this.lightMap && this.lightMap.isTexture ) {

			data.lightMap = this.lightMap.toJSON( meta ).uuid;
			data.lightMapIntensity = this.lightMapIntensity;

		}

		if ( this.aoMap && this.aoMap.isTexture ) {

			data.aoMap = this.aoMap.toJSON( meta ).uuid;
			data.aoMapIntensity = this.aoMapIntensity;

		}

		if ( this.bumpMap && this.bumpMap.isTexture ) {

			data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
			data.bumpScale = this.bumpScale;

		}

		if ( this.normalMap && this.normalMap.isTexture ) {

			data.normalMap = this.normalMap.toJSON( meta ).uuid;
			data.normalMapType = this.normalMapType;
			data.normalScale = this.normalScale.toArray();

		}

		if ( this.displacementMap && this.displacementMap.isTexture ) {

			data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
			data.displacementScale = this.displacementScale;
			data.displacementBias = this.displacementBias;

		}

		if ( this.roughnessMap && this.roughnessMap.isTexture ) data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid;
		if ( this.metalnessMap && this.metalnessMap.isTexture ) data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid;

		if ( this.emissiveMap && this.emissiveMap.isTexture ) data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid;
		if ( this.specularMap && this.specularMap.isTexture ) data.specularMap = this.specularMap.toJSON( meta ).uuid;
		if ( this.specularIntensityMap && this.specularIntensityMap.isTexture ) data.specularIntensityMap = this.specularIntensityMap.toJSON( meta ).uuid;
		if ( this.specularColorMap && this.specularColorMap.isTexture ) data.specularColorMap = this.specularColorMap.toJSON( meta ).uuid;

		if ( this.envMap && this.envMap.isTexture ) {

			data.envMap = this.envMap.toJSON( meta ).uuid;

			if ( this.combine !== undefined ) data.combine = this.combine;

		}

		if ( this.envMapIntensity !== undefined ) data.envMapIntensity = this.envMapIntensity;
		if ( this.reflectivity !== undefined ) data.reflectivity = this.reflectivity;
		if ( this.refractionRatio !== undefined ) data.refractionRatio = this.refractionRatio;

		if ( this.gradientMap && this.gradientMap.isTexture ) {

			data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

		}

		if ( this.transmission !== undefined ) data.transmission = this.transmission;
		if ( this.transmissionMap && this.transmissionMap.isTexture ) data.transmissionMap = this.transmissionMap.toJSON( meta ).uuid;
		if ( this.thickness !== undefined ) data.thickness = this.thickness;
		if ( this.thicknessMap && this.thicknessMap.isTexture ) data.thicknessMap = this.thicknessMap.toJSON( meta ).uuid;
		if ( this.attenuationDistance !== undefined ) data.attenuationDistance = this.attenuationDistance;
		if ( this.attenuationColor !== undefined ) data.attenuationColor = this.attenuationColor.getHex();

		if ( this.size !== undefined ) data.size = this.size;
		if ( this.shadowSide !== null ) data.shadowSide = this.shadowSide;
		if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

		if ( this.blending !== NormalBlending ) data.blending = this.blending;
		if ( this.side !== FrontSide ) data.side = this.side;
		if ( this.vertexColors ) data.vertexColors = true;

		if ( this.opacity < 1 ) data.opacity = this.opacity;
		if ( this.transparent === true ) data.transparent = this.transparent;

		data.depthFunc = this.depthFunc;
		data.depthTest = this.depthTest;
		data.depthWrite = this.depthWrite;
		data.colorWrite = this.colorWrite;

		data.stencilWrite = this.stencilWrite;
		data.stencilWriteMask = this.stencilWriteMask;
		data.stencilFunc = this.stencilFunc;
		data.stencilRef = this.stencilRef;
		data.stencilFuncMask = this.stencilFuncMask;
		data.stencilFail = this.stencilFail;
		data.stencilZFail = this.stencilZFail;
		data.stencilZPass = this.stencilZPass;

		// rotation (SpriteMaterial)
		if ( this.rotation !== undefined && this.rotation !== 0 ) data.rotation = this.rotation;

		if ( this.polygonOffset === true ) data.polygonOffset = true;
		if ( this.polygonOffsetFactor !== 0 ) data.polygonOffsetFactor = this.polygonOffsetFactor;
		if ( this.polygonOffsetUnits !== 0 ) data.polygonOffsetUnits = this.polygonOffsetUnits;

		if ( this.linewidth !== undefined && this.linewidth !== 1 ) data.linewidth = this.linewidth;
		if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
		if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
		if ( this.scale !== undefined ) data.scale = this.scale;

		if ( this.dithering === true ) data.dithering = true;

		if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
		if ( this.alphaToCoverage === true ) data.alphaToCoverage = this.alphaToCoverage;
		if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;

		if ( this.wireframe === true ) data.wireframe = this.wireframe;
		if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
		if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
		if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

		if ( this.flatShading === true ) data.flatShading = this.flatShading;

		if ( this.visible === false ) data.visible = false;

		if ( this.toneMapped === false ) data.toneMapped = false;

		if ( this.fog === false ) data.fog = false;

		if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

		// TODO: Copied from Object3D.toJSON

		function extractFromCache( cache ) {

			const values = [];

			for ( const key in cache ) {

				const data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}

			return values;

		}

		if ( isRootObject ) {

			const textures = extractFromCache( meta.textures );
			const images = extractFromCache( meta.images );

			if ( textures.length > 0 ) data.textures = textures;
			if ( images.length > 0 ) data.images = images;

		}

		return data;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( source ) {

		this.name = source.name;

		this.blending = source.blending;
		this.side = source.side;
		this.vertexColors = source.vertexColors;

		this.opacity = source.opacity;
		this.transparent = source.transparent;

		this.blendSrc = source.blendSrc;
		this.blendDst = source.blendDst;
		this.blendEquation = source.blendEquation;
		this.blendSrcAlpha = source.blendSrcAlpha;
		this.blendDstAlpha = source.blendDstAlpha;
		this.blendEquationAlpha = source.blendEquationAlpha;

		this.depthFunc = source.depthFunc;
		this.depthTest = source.depthTest;
		this.depthWrite = source.depthWrite;

		this.stencilWriteMask = source.stencilWriteMask;
		this.stencilFunc = source.stencilFunc;
		this.stencilRef = source.stencilRef;
		this.stencilFuncMask = source.stencilFuncMask;
		this.stencilFail = source.stencilFail;
		this.stencilZFail = source.stencilZFail;
		this.stencilZPass = source.stencilZPass;
		this.stencilWrite = source.stencilWrite;

		const srcPlanes = source.clippingPlanes;
		let dstPlanes = null;

		if ( srcPlanes !== null ) {

			const n = srcPlanes.length;
			dstPlanes = new Array( n );

			for ( let i = 0; i !== n; ++ i ) {

				dstPlanes[ i ] = srcPlanes[ i ].clone();

			}

		}

		this.clippingPlanes = dstPlanes;
		this.clipIntersection = source.clipIntersection;
		this.clipShadows = source.clipShadows;

		this.shadowSide = source.shadowSide;

		this.colorWrite = source.colorWrite;

		this.precision = source.precision;

		this.polygonOffset = source.polygonOffset;
		this.polygonOffsetFactor = source.polygonOffsetFactor;
		this.polygonOffsetUnits = source.polygonOffsetUnits;

		this.dithering = source.dithering;

		this.alphaTest = source.alphaTest;
		this.alphaToCoverage = source.alphaToCoverage;
		this.premultipliedAlpha = source.premultipliedAlpha;

		this.visible = source.visible;

		this.toneMapped = source.toneMapped;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		return this;

	}

	dispose() {

		this.dispatchEvent( { type: 'dispose' } );

	}

	set needsUpdate( value ) {

		if ( value === true ) this.version ++;

	}

}

class MeshBasicMaterial extends Material {

	constructor( parameters ) {

		super();

		this.isMeshBasicMaterial = true;

		this.type = 'MeshBasicMaterial';

		this.color = new Color( 0xffffff ); // emissive

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.fog = true;

		this.setValues( parameters );

	}

	copy( source ) {

		super.copy( source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.fog = source.fog;

		return this;

	}

}

const _vector$9 = /*@__PURE__*/ new Vector3();
const _vector2$1 = /*@__PURE__*/ new Vector2();

class BufferAttribute {

	constructor( array, itemSize, normalized ) {

		if ( Array.isArray( array ) ) {

			throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );

		}

		this.isBufferAttribute = true;

		this.name = '';

		this.array = array;
		this.itemSize = itemSize;
		this.count = array !== undefined ? array.length / itemSize : 0;
		this.normalized = normalized === true;

		this.usage = StaticDrawUsage;
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	onUploadCallback() {}

	set needsUpdate( value ) {

		if ( value === true ) this.version ++;

	}

	setUsage( value ) {

		this.usage = value;

		return this;

	}

	copy( source ) {

		this.name = source.name;
		this.array = new source.array.constructor( source.array );
		this.itemSize = source.itemSize;
		this.count = source.count;
		this.normalized = source.normalized;

		this.usage = source.usage;

		return this;

	}

	copyAt( index1, attribute, index2 ) {

		index1 *= this.itemSize;
		index2 *= attribute.itemSize;

		for ( let i = 0, l = this.itemSize; i < l; i ++ ) {

			this.array[ index1 + i ] = attribute.array[ index2 + i ];

		}

		return this;

	}

	copyArray( array ) {

		this.array.set( array );

		return this;

	}

	copyColorsArray( colors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = colors.length; i < l; i ++ ) {

			let color = colors[ i ];

			if ( color === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyColorsArray(): color is undefined', i );
				color = new Color();

			}

			array[ offset ++ ] = color.r;
			array[ offset ++ ] = color.g;
			array[ offset ++ ] = color.b;

		}

		return this;

	}

	copyVector2sArray( vectors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = vectors.length; i < l; i ++ ) {

			let vector = vectors[ i ];

			if ( vector === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i );
				vector = new Vector2();

			}

			array[ offset ++ ] = vector.x;
			array[ offset ++ ] = vector.y;

		}

		return this;

	}

	copyVector3sArray( vectors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = vectors.length; i < l; i ++ ) {

			let vector = vectors[ i ];

			if ( vector === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i );
				vector = new Vector3();

			}

			array[ offset ++ ] = vector.x;
			array[ offset ++ ] = vector.y;
			array[ offset ++ ] = vector.z;

		}

		return this;

	}

	copyVector4sArray( vectors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = vectors.length; i < l; i ++ ) {

			let vector = vectors[ i ];

			if ( vector === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i );
				vector = new Vector4();

			}

			array[ offset ++ ] = vector.x;
			array[ offset ++ ] = vector.y;
			array[ offset ++ ] = vector.z;
			array[ offset ++ ] = vector.w;

		}

		return this;

	}

	applyMatrix3( m ) {

		if ( this.itemSize === 2 ) {

			for ( let i = 0, l = this.count; i < l; i ++ ) {

				_vector2$1.fromBufferAttribute( this, i );
				_vector2$1.applyMatrix3( m );

				this.setXY( i, _vector2$1.x, _vector2$1.y );

			}

		} else if ( this.itemSize === 3 ) {

			for ( let i = 0, l = this.count; i < l; i ++ ) {

				_vector$9.fromBufferAttribute( this, i );
				_vector$9.applyMatrix3( m );

				this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

			}

		}

		return this;

	}

	applyMatrix4( m ) {

		for ( let i = 0, l = this.count; i < l; i ++ ) {

			_vector$9.fromBufferAttribute( this, i );

			_vector$9.applyMatrix4( m );

			this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

		}

		return this;

	}

	applyNormalMatrix( m ) {

		for ( let i = 0, l = this.count; i < l; i ++ ) {

			_vector$9.fromBufferAttribute( this, i );

			_vector$9.applyNormalMatrix( m );

			this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

		}

		return this;

	}

	transformDirection( m ) {

		for ( let i = 0, l = this.count; i < l; i ++ ) {

			_vector$9.fromBufferAttribute( this, i );

			_vector$9.transformDirection( m );

			this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

		}

		return this;

	}

	set( value, offset = 0 ) {

		this.array.set( value, offset );

		return this;

	}

	getX( index ) {

		return this.array[ index * this.itemSize ];

	}

	setX( index, x ) {

		this.array[ index * this.itemSize ] = x;

		return this;

	}

	getY( index ) {

		return this.array[ index * this.itemSize + 1 ];

	}

	setY( index, y ) {

		this.array[ index * this.itemSize + 1 ] = y;

		return this;

	}

	getZ( index ) {

		return this.array[ index * this.itemSize + 2 ];

	}

	setZ( index, z ) {

		this.array[ index * this.itemSize + 2 ] = z;

		return this;

	}

	getW( index ) {

		return this.array[ index * this.itemSize + 3 ];

	}

	setW( index, w ) {

		this.array[ index * this.itemSize + 3 ] = w;

		return this;

	}

	setXY( index, x, y ) {

		index *= this.itemSize;

		this.array[ index + 0 ] = x;
		this.array[ index + 1 ] = y;

		return this;

	}

	setXYZ( index, x, y, z ) {

		index *= this.itemSize;

		this.array[ index + 0 ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;

		return this;

	}

	setXYZW( index, x, y, z, w ) {

		index *= this.itemSize;

		this.array[ index + 0 ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;
		this.array[ index + 3 ] = w;

		return this;

	}

	onUpload( callback ) {

		this.onUploadCallback = callback;

		return this;

	}

	clone() {

		return new this.constructor( this.array, this.itemSize ).copy( this );

	}

	toJSON() {

		const data = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from( this.array ),
			normalized: this.normalized
		};

		if ( this.name !== '' ) data.name = this.name;
		if ( this.usage !== StaticDrawUsage ) data.usage = this.usage;
		if ( this.updateRange.offset !== 0 || this.updateRange.count !== - 1 ) data.updateRange = this.updateRange;

		return data;

	}

}

class Uint16BufferAttribute extends BufferAttribute {

	constructor( array, itemSize, normalized ) {

		super( new Uint16Array( array ), itemSize, normalized );

	}

}

class Uint32BufferAttribute extends BufferAttribute {

	constructor( array, itemSize, normalized ) {

		super( new Uint32Array( array ), itemSize, normalized );

	}

}


class Float32BufferAttribute extends BufferAttribute {

	constructor( array, itemSize, normalized ) {

		super( new Float32Array( array ), itemSize, normalized );

	}

}

let _id$1 = 0;

const _m1 = /*@__PURE__*/ new Matrix4();
const _obj = /*@__PURE__*/ new Object3D();
const _offset = /*@__PURE__*/ new Vector3();
const _box$1 = /*@__PURE__*/ new Box3();
const _boxMorphTargets = /*@__PURE__*/ new Box3();
const _vector$8 = /*@__PURE__*/ new Vector3();

class BufferGeometry extends EventDispatcher {

	constructor() {

		super();

		this.isBufferGeometry = true;

		Object.defineProperty( this, 'id', { value: _id$1 ++ } );

		this.uuid = generateUUID();

		this.name = '';
		this.type = 'BufferGeometry';

		this.index = null;
		this.attributes = {};

		this.morphAttributes = {};
		this.morphTargetsRelative = false;

		this.groups = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		this.drawRange = { start: 0, count: Infinity };

		this.userData = {};

	}

	getIndex() {

		return this.index;

	}

	setIndex( index ) {

		if ( Array.isArray( index ) ) {

			this.index = new ( arrayNeedsUint32( index ) ? Uint32BufferAttribute : Uint16BufferAttribute )( index, 1 );

		} else {

			this.index = index;

		}

		return this;

	}

	getAttribute( name ) {

		return this.attributes[ name ];

	}

	setAttribute( name, attribute ) {

		this.attributes[ name ] = attribute;

		return this;

	}

	deleteAttribute( name ) {

		delete this.attributes[ name ];

		return this;

	}

	hasAttribute( name ) {

		return this.attributes[ name ] !== undefined;

	}

	addGroup( start, count, materialIndex = 0 ) {

		this.groups.push( {

			start: start,
			count: count,
			materialIndex: materialIndex

		} );

	}

	clearGroups() {

		this.groups = [];

	}

	setDrawRange( start, count ) {

		this.drawRange.start = start;
		this.drawRange.count = count;

	}

	applyMatrix4( matrix ) {

		const position = this.attributes.position;

		if ( position !== undefined ) {

			position.applyMatrix4( matrix );

			position.needsUpdate = true;

		}

		const normal = this.attributes.normal;

		if ( normal !== undefined ) {

			const normalMatrix = new Matrix3().getNormalMatrix( matrix );

			normal.applyNormalMatrix( normalMatrix );

			normal.needsUpdate = true;

		}

		const tangent = this.attributes.tangent;

		if ( tangent !== undefined ) {

			tangent.transformDirection( matrix );

			tangent.needsUpdate = true;

		}

		if ( this.boundingBox !== null ) {

			this.computeBoundingBox();

		}

		if ( this.boundingSphere !== null ) {

			this.computeBoundingSphere();

		}

		return this;

	}

	applyQuaternion( q ) {

		_m1.makeRotationFromQuaternion( q );

		this.applyMatrix4( _m1 );

		return this;

	}

	rotateX( angle ) {

		// rotate geometry around world x-axis

		_m1.makeRotationX( angle );

		this.applyMatrix4( _m1 );

		return this;

	}

	rotateY( angle ) {

		// rotate geometry around world y-axis

		_m1.makeRotationY( angle );

		this.applyMatrix4( _m1 );

		return this;

	}

	rotateZ( angle ) {

		// rotate geometry around world z-axis

		_m1.makeRotationZ( angle );

		this.applyMatrix4( _m1 );

		return this;

	}

	translate( x, y, z ) {

		// translate geometry

		_m1.makeTranslation( x, y, z );

		this.applyMatrix4( _m1 );

		return this;

	}

	scale( x, y, z ) {

		// scale geometry

		_m1.makeScale( x, y, z );

		this.applyMatrix4( _m1 );

		return this;

	}

	lookAt( vector ) {

		_obj.lookAt( vector );

		_obj.updateMatrix();

		this.applyMatrix4( _obj.matrix );

		return this;

	}

	center() {

		this.computeBoundingBox();

		this.boundingBox.getCenter( _offset ).negate();

		this.translate( _offset.x, _offset.y, _offset.z );

		return this;

	}

	setFromPoints( points ) {

		const position = [];

		for ( let i = 0, l = points.length; i < l; i ++ ) {

			const point = points[ i ];
			position.push( point.x, point.y, point.z || 0 );

		}

		this.setAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

		return this;

	}

	computeBoundingBox() {

		if ( this.boundingBox === null ) {

			this.boundingBox = new Box3();

		}

		const position = this.attributes.position;
		const morphAttributesPosition = this.morphAttributes.position;

		if ( position && position.isGLBufferAttribute ) {

			console.error( 'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this );

			this.boundingBox.set(
				new Vector3( - Infinity, - Infinity, - Infinity ),
				new Vector3( + Infinity, + Infinity, + Infinity )
			);

			return;

		}

		if ( position !== undefined ) {

			this.boundingBox.setFromBufferAttribute( position );

			// process morph attributes if present

			if ( morphAttributesPosition ) {

				for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

					const morphAttribute = morphAttributesPosition[ i ];
					_box$1.setFromBufferAttribute( morphAttribute );

					if ( this.morphTargetsRelative ) {

						_vector$8.addVectors( this.boundingBox.min, _box$1.min );
						this.boundingBox.expandByPoint( _vector$8 );

						_vector$8.addVectors( this.boundingBox.max, _box$1.max );
						this.boundingBox.expandByPoint( _vector$8 );

					} else {

						this.boundingBox.expandByPoint( _box$1.min );
						this.boundingBox.expandByPoint( _box$1.max );

					}

				}

			}

		} else {

			this.boundingBox.makeEmpty();

		}

		if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

			console.error( 'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this );

		}

	}

	computeBoundingSphere() {

		if ( this.boundingSphere === null ) {

			this.boundingSphere = new Sphere();

		}

		const position = this.attributes.position;
		const morphAttributesPosition = this.morphAttributes.position;

		if ( position && position.isGLBufferAttribute ) {

			console.error( 'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this );

			this.boundingSphere.set( new Vector3(), Infinity );

			return;

		}

		if ( position ) {

			// first, find the center of the bounding sphere

			const center = this.boundingSphere.center;

			_box$1.setFromBufferAttribute( position );

			// process morph attributes if present

			if ( morphAttributesPosition ) {

				for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

					const morphAttribute = morphAttributesPosition[ i ];
					_boxMorphTargets.setFromBufferAttribute( morphAttribute );

					if ( this.morphTargetsRelative ) {

						_vector$8.addVectors( _box$1.min, _boxMorphTargets.min );
						_box$1.expandByPoint( _vector$8 );

						_vector$8.addVectors( _box$1.max, _boxMorphTargets.max );
						_box$1.expandByPoint( _vector$8 );

					} else {

						_box$1.expandByPoint( _boxMorphTargets.min );
						_box$1.expandByPoint( _boxMorphTargets.max );

					}

				}

			}

			_box$1.getCenter( center );

			// second, try to find a boundingSphere with a radius smaller than the
			// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

			let maxRadiusSq = 0;

			for ( let i = 0, il = position.count; i < il; i ++ ) {

				_vector$8.fromBufferAttribute( position, i );

				maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$8 ) );

			}

			// process morph attributes if present

			if ( morphAttributesPosition ) {

				for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

					const morphAttribute = morphAttributesPosition[ i ];
					const morphTargetsRelative = this.morphTargetsRelative;

					for ( let j = 0, jl = morphAttribute.count; j < jl; j ++ ) {

						_vector$8.fromBufferAttribute( morphAttribute, j );

						if ( morphTargetsRelative ) {

							_offset.fromBufferAttribute( position, j );
							_vector$8.add( _offset );

						}

						maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$8 ) );

					}

				}

			}

			this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

			if ( isNaN( this.boundingSphere.radius ) ) {

				console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );

			}

		}

	}

	computeTangents() {

		const index = this.index;
		const attributes = this.attributes;

		// based on http://www.terathon.com/code/tangent.html
		// (per vertex tangents)

		if ( index === null ||
			 attributes.position === undefined ||
			 attributes.normal === undefined ||
			 attributes.uv === undefined ) {

			console.error( 'THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)' );
			return;

		}

		const indices = index.array;
		const positions = attributes.position.array;
		const normals = attributes.normal.array;
		const uvs = attributes.uv.array;

		const nVertices = positions.length / 3;

		if ( this.hasAttribute( 'tangent' ) === false ) {

			this.setAttribute( 'tangent', new BufferAttribute( new Float32Array( 4 * nVertices ), 4 ) );

		}

		const tangents = this.getAttribute( 'tangent' ).array;

		const tan1 = [], tan2 = [];

		for ( let i = 0; i < nVertices; i ++ ) {

			tan1[ i ] = new Vector3();
			tan2[ i ] = new Vector3();

		}

		const vA = new Vector3(),
			vB = new Vector3(),
			vC = new Vector3(),

			uvA = new Vector2(),
			uvB = new Vector2(),
			uvC = new Vector2(),

			sdir = new Vector3(),
			tdir = new Vector3();

		function handleTriangle( a, b, c ) {

			vA.fromArray( positions, a * 3 );
			vB.fromArray( positions, b * 3 );
			vC.fromArray( positions, c * 3 );

			uvA.fromArray( uvs, a * 2 );
			uvB.fromArray( uvs, b * 2 );
			uvC.fromArray( uvs, c * 2 );

			vB.sub( vA );
			vC.sub( vA );

			uvB.sub( uvA );
			uvC.sub( uvA );

			const r = 1.0 / ( uvB.x * uvC.y - uvC.x * uvB.y );

			// silently ignore degenerate uv triangles having coincident or colinear vertices

			if ( ! isFinite( r ) ) return;

			sdir.copy( vB ).multiplyScalar( uvC.y ).addScaledVector( vC, - uvB.y ).multiplyScalar( r );
			tdir.copy( vC ).multiplyScalar( uvB.x ).addScaledVector( vB, - uvC.x ).multiplyScalar( r );

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		let groups = this.groups;

		if ( groups.length === 0 ) {

			groups = [ {
				start: 0,
				count: indices.length
			} ];

		}

		for ( let i = 0, il = groups.length; i < il; ++ i ) {

			const group = groups[ i ];

			const start = group.start;
			const count = group.count;

			for ( let j = start, jl = start + count; j < jl; j += 3 ) {

				handleTriangle(
					indices[ j + 0 ],
					indices[ j + 1 ],
					indices[ j + 2 ]
				);

			}

		}

		const tmp = new Vector3(), tmp2 = new Vector3();
		const n = new Vector3(), n2 = new Vector3();

		function handleVertex( v ) {

			n.fromArray( normals, v * 3 );
			n2.copy( n );

			const t = tan1[ v ];

			// Gram-Schmidt orthogonalize

			tmp.copy( t );
			tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

			// Calculate handedness

			tmp2.crossVectors( n2, t );
			const test = tmp2.dot( tan2[ v ] );
			const w = ( test < 0.0 ) ? - 1.0 : 1.0;

			tangents[ v * 4 ] = tmp.x;
			tangents[ v * 4 + 1 ] = tmp.y;
			tangents[ v * 4 + 2 ] = tmp.z;
			tangents[ v * 4 + 3 ] = w;

		}

		for ( let i = 0, il = groups.length; i < il; ++ i ) {

			const group = groups[ i ];

			const start = group.start;
			const count = group.count;

			for ( let j = start, jl = start + count; j < jl; j += 3 ) {

				handleVertex( indices[ j + 0 ] );
				handleVertex( indices[ j + 1 ] );
				handleVertex( indices[ j + 2 ] );

			}

		}

	}

	computeVertexNormals() {

		const index = this.index;
		const positionAttribute = this.getAttribute( 'position' );

		if ( positionAttribute !== undefined ) {

			let normalAttribute = this.getAttribute( 'normal' );

			if ( normalAttribute === undefined ) {

				normalAttribute = new BufferAttribute( new Float32Array( positionAttribute.count * 3 ), 3 );
				this.setAttribute( 'normal', normalAttribute );

			} else {

				// reset existing normals to zero

				for ( let i = 0, il = normalAttribute.count; i < il; i ++ ) {

					normalAttribute.setXYZ( i, 0, 0, 0 );

				}

			}

			const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
			const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
			const cb = new Vector3(), ab = new Vector3();

			// indexed elements

			if ( index ) {

				for ( let i = 0, il = index.count; i < il; i += 3 ) {

					const vA = index.getX( i + 0 );
					const vB = index.getX( i + 1 );
					const vC = index.getX( i + 2 );

					pA.fromBufferAttribute( positionAttribute, vA );
					pB.fromBufferAttribute( positionAttribute, vB );
					pC.fromBufferAttribute( positionAttribute, vC );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					nA.fromBufferAttribute( normalAttribute, vA );
					nB.fromBufferAttribute( normalAttribute, vB );
					nC.fromBufferAttribute( normalAttribute, vC );

					nA.add( cb );
					nB.add( cb );
					nC.add( cb );

					normalAttribute.setXYZ( vA, nA.x, nA.y, nA.z );
					normalAttribute.setXYZ( vB, nB.x, nB.y, nB.z );
					normalAttribute.setXYZ( vC, nC.x, nC.y, nC.z );

				}

			} else {

				// non-indexed elements (unconnected triangle soup)

				for ( let i = 0, il = positionAttribute.count; i < il; i += 3 ) {

					pA.fromBufferAttribute( positionAttribute, i + 0 );
					pB.fromBufferAttribute( positionAttribute, i + 1 );
					pC.fromBufferAttribute( positionAttribute, i + 2 );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					normalAttribute.setXYZ( i + 0, cb.x, cb.y, cb.z );
					normalAttribute.setXYZ( i + 1, cb.x, cb.y, cb.z );
					normalAttribute.setXYZ( i + 2, cb.x, cb.y, cb.z );

				}

			}

			this.normalizeNormals();

			normalAttribute.needsUpdate = true;

		}

	}

	merge( geometry, offset ) {

		if ( ! ( geometry && geometry.isBufferGeometry ) ) {

			console.error( 'THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry );
			return;

		}

		if ( offset === undefined ) {

			offset = 0;

			console.warn(
				'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
				+ 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
			);

		}

		const attributes = this.attributes;

		for ( const key in attributes ) {

			if ( geometry.attributes[ key ] === undefined ) continue;

			const attribute1 = attributes[ key ];
			const attributeArray1 = attribute1.array;

			const attribute2 = geometry.attributes[ key ];
			const attributeArray2 = attribute2.array;

			const attributeOffset = attribute2.itemSize * offset;
			const length = Math.min( attributeArray2.length, attributeArray1.length - attributeOffset );

			for ( let i = 0, j = attributeOffset; i < length; i ++, j ++ ) {

				attributeArray1[ j ] = attributeArray2[ i ];

			}

		}

		return this;

	}

	normalizeNormals() {

		const normals = this.attributes.normal;

		for ( let i = 0, il = normals.count; i < il; i ++ ) {

			_vector$8.fromBufferAttribute( normals, i );

			_vector$8.normalize();

			normals.setXYZ( i, _vector$8.x, _vector$8.y, _vector$8.z );

		}

	}

	toNonIndexed() {

		function convertBufferAttribute( attribute, indices ) {

			const array = attribute.array;
			const itemSize = attribute.itemSize;
			const normalized = attribute.normalized;

			const array2 = new array.constructor( indices.length * itemSize );

			let index = 0, index2 = 0;

			for ( let i = 0, l = indices.length; i < l; i ++ ) {

				if ( attribute.isInterleavedBufferAttribute ) {

					index = indices[ i ] * attribute.data.stride + attribute.offset;

				} else {

					index = indices[ i ] * itemSize;

				}

				for ( let j = 0; j < itemSize; j ++ ) {

					array2[ index2 ++ ] = array[ index ++ ];

				}

			}

			return new BufferAttribute( array2, itemSize, normalized );

		}

		//

		if ( this.index === null ) {

			console.warn( 'THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.' );
			return this;

		}

		const geometry2 = new BufferGeometry();

		const indices = this.index.array;
		const attributes = this.attributes;

		// attributes

		for ( const name in attributes ) {

			const attribute = attributes[ name ];

			const newAttribute = convertBufferAttribute( attribute, indices );

			geometry2.setAttribute( name, newAttribute );

		}

		// morph attributes

		const morphAttributes = this.morphAttributes;

		for ( const name in morphAttributes ) {

			const morphArray = [];
			const morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const attribute = morphAttribute[ i ];

				const newAttribute = convertBufferAttribute( attribute, indices );

				morphArray.push( newAttribute );

			}

			geometry2.morphAttributes[ name ] = morphArray;

		}

		geometry2.morphTargetsRelative = this.morphTargetsRelative;

		// groups

		const groups = this.groups;

		for ( let i = 0, l = groups.length; i < l; i ++ ) {

			const group = groups[ i ];
			geometry2.addGroup( group.start, group.count, group.materialIndex );

		}

		return geometry2;

	}

	toJSON() {

		const data = {
			metadata: {
				version: 4.5,
				type: 'BufferGeometry',
				generator: 'BufferGeometry.toJSON'
			}
		};

		// standard BufferGeometry serialization

		data.uuid = this.uuid;
		data.type = this.type;
		if ( this.name !== '' ) data.name = this.name;
		if ( Object.keys( this.userData ).length > 0 ) data.userData = this.userData;

		if ( this.parameters !== undefined ) {

			const parameters = this.parameters;

			for ( const key in parameters ) {

				if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

			}

			return data;

		}

		// for simplicity the code assumes attributes are not shared across geometries, see #15811

		data.data = { attributes: {} };

		const index = this.index;

		if ( index !== null ) {

			data.data.index = {
				type: index.array.constructor.name,
				array: Array.prototype.slice.call( index.array )
			};

		}

		const attributes = this.attributes;

		for ( const key in attributes ) {

			const attribute = attributes[ key ];

			data.data.attributes[ key ] = attribute.toJSON( data.data );

		}

		const morphAttributes = {};
		let hasMorphAttributes = false;

		for ( const key in this.morphAttributes ) {

			const attributeArray = this.morphAttributes[ key ];

			const array = [];

			for ( let i = 0, il = attributeArray.length; i < il; i ++ ) {

				const attribute = attributeArray[ i ];

				array.push( attribute.toJSON( data.data ) );

			}

			if ( array.length > 0 ) {

				morphAttributes[ key ] = array;

				hasMorphAttributes = true;

			}

		}

		if ( hasMorphAttributes ) {

			data.data.morphAttributes = morphAttributes;
			data.data.morphTargetsRelative = this.morphTargetsRelative;

		}

		const groups = this.groups;

		if ( groups.length > 0 ) {

			data.data.groups = JSON.parse( JSON.stringify( groups ) );

		}

		const boundingSphere = this.boundingSphere;

		if ( boundingSphere !== null ) {

			data.data.boundingSphere = {
				center: boundingSphere.center.toArray(),
				radius: boundingSphere.radius
			};

		}

		return data;

	}

	clone() {

		 return new this.constructor().copy( this );

	}

	copy( source ) {

		// reset

		this.index = null;
		this.attributes = {};
		this.morphAttributes = {};
		this.groups = [];
		this.boundingBox = null;
		this.boundingSphere = null;

		// used for storing cloned, shared data

		const data = {};

		// name

		this.name = source.name;

		// index

		const index = source.index;

		if ( index !== null ) {

			this.setIndex( index.clone( data ) );

		}

		// attributes

		const attributes = source.attributes;

		for ( const name in attributes ) {

			const attribute = attributes[ name ];
			this.setAttribute( name, attribute.clone( data ) );

		}

		// morph attributes

		const morphAttributes = source.morphAttributes;

		for ( const name in morphAttributes ) {

			const array = [];
			const morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

			for ( let i = 0, l = morphAttribute.length; i < l; i ++ ) {

				array.push( morphAttribute[ i ].clone( data ) );

			}

			this.morphAttributes[ name ] = array;

		}

		this.morphTargetsRelative = source.morphTargetsRelative;

		// groups

		const groups = source.groups;

		for ( let i = 0, l = groups.length; i < l; i ++ ) {

			const group = groups[ i ];
			this.addGroup( group.start, group.count, group.materialIndex );

		}

		// bounding box

		const boundingBox = source.boundingBox;

		if ( boundingBox !== null ) {

			this.boundingBox = boundingBox.clone();

		}

		// bounding sphere

		const boundingSphere = source.boundingSphere;

		if ( boundingSphere !== null ) {

			this.boundingSphere = boundingSphere.clone();

		}

		// draw range

		this.drawRange.start = source.drawRange.start;
		this.drawRange.count = source.drawRange.count;

		// user data

		this.userData = source.userData;

		// geometry generator parameters

		if ( source.parameters !== undefined ) this.parameters = Object.assign( {}, source.parameters );

		return this;

	}

	dispose() {

		this.dispatchEvent( { type: 'dispose' } );

	}

}

const _inverseMatrix$2 = /*@__PURE__*/ new Matrix4();
const _ray$2 = /*@__PURE__*/ new Ray();
const _sphere$3 = /*@__PURE__*/ new Sphere();

const _vA$1 = /*@__PURE__*/ new Vector3();
const _vB$1 = /*@__PURE__*/ new Vector3();
const _vC$1 = /*@__PURE__*/ new Vector3();

const _tempA = /*@__PURE__*/ new Vector3();
const _tempB = /*@__PURE__*/ new Vector3();
const _tempC = /*@__PURE__*/ new Vector3();

const _morphA = /*@__PURE__*/ new Vector3();
const _morphB = /*@__PURE__*/ new Vector3();
const _morphC = /*@__PURE__*/ new Vector3();

const _uvA$1 = /*@__PURE__*/ new Vector2();
const _uvB$1 = /*@__PURE__*/ new Vector2();
const _uvC$1 = /*@__PURE__*/ new Vector2();

const _intersectionPoint = /*@__PURE__*/ new Vector3();
const _intersectionPointWorld = /*@__PURE__*/ new Vector3();

class Mesh extends Object3D {

	constructor( geometry = new BufferGeometry(), material = new MeshBasicMaterial() ) {

		super();

		this.isMesh = true;

		this.type = 'Mesh';

		this.geometry = geometry;
		this.material = material;

		this.updateMorphTargets();

	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		if ( source.morphTargetInfluences !== undefined ) {

			this.morphTargetInfluences = source.morphTargetInfluences.slice();

		}

		if ( source.morphTargetDictionary !== undefined ) {

			this.morphTargetDictionary = Object.assign( {}, source.morphTargetDictionary );

		}

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	}

	updateMorphTargets() {

		const geometry = this.geometry;

		const morphAttributes = geometry.morphAttributes;
		const keys = Object.keys( morphAttributes );

		if ( keys.length > 0 ) {

			const morphAttribute = morphAttributes[ keys[ 0 ] ];

			if ( morphAttribute !== undefined ) {

				this.morphTargetInfluences = [];
				this.morphTargetDictionary = {};

				for ( let m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

					const name = morphAttribute[ m ].name || String( m );

					this.morphTargetInfluences.push( 0 );
					this.morphTargetDictionary[ name ] = m;

				}

			}

		}

	}

	raycast( raycaster, intersects ) {

		const geometry = this.geometry;
		const material = this.material;
		const matrixWorld = this.matrixWorld;

		if ( material === undefined ) return;

		// Checking boundingSphere distance to ray

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		_sphere$3.copy( geometry.boundingSphere );
		_sphere$3.applyMatrix4( matrixWorld );

		if ( raycaster.ray.intersectsSphere( _sphere$3 ) === false ) return;

		//

		_inverseMatrix$2.copy( matrixWorld ).invert();
		_ray$2.copy( raycaster.ray ).applyMatrix4( _inverseMatrix$2 );

		// Check boundingBox before continuing

		if ( geometry.boundingBox !== null ) {

			if ( _ray$2.intersectsBox( geometry.boundingBox ) === false ) return;

		}

		let intersection;

		const index = geometry.index;
		const position = geometry.attributes.position;
		const morphPosition = geometry.morphAttributes.position;
		const morphTargetsRelative = geometry.morphTargetsRelative;
		const uv = geometry.attributes.uv;
		const uv2 = geometry.attributes.uv2;
		const groups = geometry.groups;
		const drawRange = geometry.drawRange;

		if ( index !== null ) {

			// indexed buffer geometry

			if ( Array.isArray( material ) ) {

				for ( let i = 0, il = groups.length; i < il; i ++ ) {

					const group = groups[ i ];
					const groupMaterial = material[ group.materialIndex ];

					const start = Math.max( group.start, drawRange.start );
					const end = Math.min( index.count, Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) ) );

					for ( let j = start, jl = end; j < jl; j += 3 ) {

						const a = index.getX( j );
						const b = index.getX( j + 1 );
						const c = index.getX( j + 2 );

						intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

						if ( intersection ) {

							intersection.faceIndex = Math.floor( j / 3 ); // triangle number in indexed buffer semantics
							intersection.face.materialIndex = group.materialIndex;
							intersects.push( intersection );

						}

					}

				}

			} else {

				const start = Math.max( 0, drawRange.start );
				const end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

				for ( let i = start, il = end; i < il; i += 3 ) {

					const a = index.getX( i );
					const b = index.getX( i + 1 );
					const c = index.getX( i + 2 );

					intersection = checkBufferGeometryIntersection( this, material, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

					if ( intersection ) {

						intersection.faceIndex = Math.floor( i / 3 ); // triangle number in indexed buffer semantics
						intersects.push( intersection );

					}

				}

			}

		} else if ( position !== undefined ) {

			// non-indexed buffer geometry

			if ( Array.isArray( material ) ) {

				for ( let i = 0, il = groups.length; i < il; i ++ ) {

					const group = groups[ i ];
					const groupMaterial = material[ group.materialIndex ];

					const start = Math.max( group.start, drawRange.start );
					const end = Math.min( position.count, Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) ) );

					for ( let j = start, jl = end; j < jl; j += 3 ) {

						const a = j;
						const b = j + 1;
						const c = j + 2;

						intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

						if ( intersection ) {

							intersection.faceIndex = Math.floor( j / 3 ); // triangle number in non-indexed buffer semantics
							intersection.face.materialIndex = group.materialIndex;
							intersects.push( intersection );

						}

					}

				}

			} else {

				const start = Math.max( 0, drawRange.start );
				const end = Math.min( position.count, ( drawRange.start + drawRange.count ) );

				for ( let i = start, il = end; i < il; i += 3 ) {

					const a = i;
					const b = i + 1;
					const c = i + 2;

					intersection = checkBufferGeometryIntersection( this, material, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

					if ( intersection ) {

						intersection.faceIndex = Math.floor( i / 3 ); // triangle number in non-indexed buffer semantics
						intersects.push( intersection );

					}

				}

			}

		}

	}

}

function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

	let intersect;

	if ( material.side === BackSide ) {

		intersect = ray.intersectTriangle( pC, pB, pA, true, point );

	} else {

		intersect = ray.intersectTriangle( pA, pB, pC, material.side !== DoubleSide, point );

	}

	if ( intersect === null ) return null;

	_intersectionPointWorld.copy( point );
	_intersectionPointWorld.applyMatrix4( object.matrixWorld );

	const distance = raycaster.ray.origin.distanceTo( _intersectionPointWorld );

	if ( distance < raycaster.near || distance > raycaster.far ) return null;

	return {
		distance: distance,
		point: _intersectionPointWorld.clone(),
		object: object
	};

}

function checkBufferGeometryIntersection( object, material, raycaster, ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c ) {

	_vA$1.fromBufferAttribute( position, a );
	_vB$1.fromBufferAttribute( position, b );
	_vC$1.fromBufferAttribute( position, c );

	const morphInfluences = object.morphTargetInfluences;

	if ( morphPosition && morphInfluences ) {

		_morphA.set( 0, 0, 0 );
		_morphB.set( 0, 0, 0 );
		_morphC.set( 0, 0, 0 );

		for ( let i = 0, il = morphPosition.length; i < il; i ++ ) {

			const influence = morphInfluences[ i ];
			const morphAttribute = morphPosition[ i ];

			if ( influence === 0 ) continue;

			_tempA.fromBufferAttribute( morphAttribute, a );
			_tempB.fromBufferAttribute( morphAttribute, b );
			_tempC.fromBufferAttribute( morphAttribute, c );

			if ( morphTargetsRelative ) {

				_morphA.addScaledVector( _tempA, influence );
				_morphB.addScaledVector( _tempB, influence );
				_morphC.addScaledVector( _tempC, influence );

			} else {

				_morphA.addScaledVector( _tempA.sub( _vA$1 ), influence );
				_morphB.addScaledVector( _tempB.sub( _vB$1 ), influence );
				_morphC.addScaledVector( _tempC.sub( _vC$1 ), influence );

			}

		}

		_vA$1.add( _morphA );
		_vB$1.add( _morphB );
		_vC$1.add( _morphC );

	}

	if ( object.isSkinnedMesh ) {

		object.boneTransform( a, _vA$1 );
		object.boneTransform( b, _vB$1 );
		object.boneTransform( c, _vC$1 );

	}

	const intersection = checkIntersection( object, material, raycaster, ray, _vA$1, _vB$1, _vC$1, _intersectionPoint );

	if ( intersection ) {

		if ( uv ) {

			_uvA$1.fromBufferAttribute( uv, a );
			_uvB$1.fromBufferAttribute( uv, b );
			_uvC$1.fromBufferAttribute( uv, c );

			intersection.uv = Triangle.getUV( _intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2() );

		}

		if ( uv2 ) {

			_uvA$1.fromBufferAttribute( uv2, a );
			_uvB$1.fromBufferAttribute( uv2, b );
			_uvC$1.fromBufferAttribute( uv2, c );

			intersection.uv2 = Triangle.getUV( _intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2() );

		}

		const face = {
			a: a,
			b: b,
			c: c,
			normal: new Vector3(),
			materialIndex: 0
		};

		Triangle.getNormal( _vA$1, _vB$1, _vC$1, face.normal );

		intersection.face = face;

	}

	return intersection;

}

/**
 * Uniform Utilities
 */

function cloneUniforms( src ) {

	const dst = {};

	for ( const u in src ) {

		dst[ u ] = {};

		for ( const p in src[ u ] ) {

			const property = src[ u ][ p ];

			if ( property && ( property.isColor ||
				property.isMatrix3 || property.isMatrix4 ||
				property.isVector2 || property.isVector3 || property.isVector4 ||
				property.isTexture || property.isQuaternion ) ) {

				dst[ u ][ p ] = property.clone();

			} else if ( Array.isArray( property ) ) {

				dst[ u ][ p ] = property.slice();

			} else {

				dst[ u ][ p ] = property;

			}

		}

	}

	return dst;

}

var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";

var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

class ShaderMaterial extends Material {

	constructor( parameters ) {

		super();

		this.isShaderMaterial = true;

		this.type = 'ShaderMaterial';

		this.defines = {};
		this.uniforms = {};

		this.vertexShader = default_vertex;
		this.fragmentShader = default_fragment;

		this.linewidth = 1;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false; // set to use scene fog
		this.lights = false; // set to use scene lights
		this.clipping = false; // set to use user-defined clipping planes

		this.extensions = {
			derivatives: false, // set to use derivatives
			fragDepth: false, // set to use fragment depth values
			drawBuffers: false, // set to use draw buffers
			shaderTextureLOD: false // set to use shader texture LOD
		};

		// When rendered geometry doesn't include these attributes but the material does,
		// use these default values in WebGL. This avoids errors when buffer data is missing.
		this.defaultAttributeValues = {
			'color': [ 1, 1, 1 ],
			'uv': [ 0, 0 ],
			'uv2': [ 0, 0 ]
		};

		this.index0AttributeName = undefined;
		this.uniformsNeedUpdate = false;

		this.glslVersion = null;

		if ( parameters !== undefined ) {

			if ( parameters.attributes !== undefined ) {

				console.error( 'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.' );

			}

			this.setValues( parameters );

		}

	}

	copy( source ) {

		super.copy( source );

		this.fragmentShader = source.fragmentShader;
		this.vertexShader = source.vertexShader;

		this.uniforms = cloneUniforms( source.uniforms );

		this.defines = Object.assign( {}, source.defines );

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		this.fog = source.fog;
		this.lights = source.lights;
		this.clipping = source.clipping;

		this.extensions = Object.assign( {}, source.extensions );

		this.glslVersion = source.glslVersion;

		return this;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		data.glslVersion = this.glslVersion;
		data.uniforms = {};

		for ( const name in this.uniforms ) {

			const uniform = this.uniforms[ name ];
			const value = uniform.value;

			if ( value && value.isTexture ) {

				data.uniforms[ name ] = {
					type: 't',
					value: value.toJSON( meta ).uuid
				};

			} else if ( value && value.isColor ) {

				data.uniforms[ name ] = {
					type: 'c',
					value: value.getHex()
				};

			} else if ( value && value.isVector2 ) {

				data.uniforms[ name ] = {
					type: 'v2',
					value: value.toArray()
				};

			} else if ( value && value.isVector3 ) {

				data.uniforms[ name ] = {
					type: 'v3',
					value: value.toArray()
				};

			} else if ( value && value.isVector4 ) {

				data.uniforms[ name ] = {
					type: 'v4',
					value: value.toArray()
				};

			} else if ( value && value.isMatrix3 ) {

				data.uniforms[ name ] = {
					type: 'm3',
					value: value.toArray()
				};

			} else if ( value && value.isMatrix4 ) {

				data.uniforms[ name ] = {
					type: 'm4',
					value: value.toArray()
				};

			} else {

				data.uniforms[ name ] = {
					value: value
				};

				// note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far

			}

		}

		if ( Object.keys( this.defines ).length > 0 ) data.defines = this.defines;

		data.vertexShader = this.vertexShader;
		data.fragmentShader = this.fragmentShader;

		const extensions = {};

		for ( const key in this.extensions ) {

			if ( this.extensions[ key ] === true ) extensions[ key ] = true;

		}

		if ( Object.keys( extensions ).length > 0 ) data.extensions = extensions;

		return data;

	}

}

const _vector1 = /*@__PURE__*/ new Vector3();
const _vector2 = /*@__PURE__*/ new Vector3();
const _normalMatrix = /*@__PURE__*/ new Matrix3();

class Plane {

	constructor( normal = new Vector3( 1, 0, 0 ), constant = 0 ) {

		this.isPlane = true;

		// normal is assumed to be normalized

		this.normal = normal;
		this.constant = constant;

	}

	set( normal, constant ) {

		this.normal.copy( normal );
		this.constant = constant;

		return this;

	}

	setComponents( x, y, z, w ) {

		this.normal.set( x, y, z );
		this.constant = w;

		return this;

	}

	setFromNormalAndCoplanarPoint( normal, point ) {

		this.normal.copy( normal );
		this.constant = - point.dot( this.normal );

		return this;

	}

	setFromCoplanarPoints( a, b, c ) {

		const normal = _vector1.subVectors( c, b ).cross( _vector2.subVectors( a, b ) ).normalize();

		// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

		this.setFromNormalAndCoplanarPoint( normal, a );

		return this;

	}

	copy( plane ) {

		this.normal.copy( plane.normal );
		this.constant = plane.constant;

		return this;

	}

	normalize() {

		// Note: will lead to a divide by zero if the plane is invalid.

		const inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	}

	negate() {

		this.constant *= - 1;
		this.normal.negate();

		return this;

	}

	distanceToPoint( point ) {

		return this.normal.dot( point ) + this.constant;

	}

	distanceToSphere( sphere ) {

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	}

	projectPoint( point, target ) {

		return target.copy( this.normal ).multiplyScalar( - this.distanceToPoint( point ) ).add( point );

	}

	intersectLine( line, target ) {

		const direction = line.delta( _vector1 );

		const denominator = this.normal.dot( direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( this.distanceToPoint( line.start ) === 0 ) {

				return target.copy( line.start );

			}

			// Unsure if this is the correct method to handle this case.
			return null;

		}

		const t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

		if ( t < 0 || t > 1 ) {

			return null;

		}

		return target.copy( direction ).multiplyScalar( t ).add( line.start );

	}

	intersectsLine( line ) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		const startSign = this.distanceToPoint( line.start );
		const endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	}

	intersectsBox( box ) {

		return box.intersectsPlane( this );

	}

	intersectsSphere( sphere ) {

		return sphere.intersectsPlane( this );

	}

	coplanarPoint( target ) {

		return target.copy( this.normal ).multiplyScalar( - this.constant );

	}

	applyMatrix4( matrix, optionalNormalMatrix ) {

		const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix( matrix );

		const referencePoint = this.coplanarPoint( _vector1 ).applyMatrix4( matrix );

		const normal = this.normal.applyMatrix3( normalMatrix ).normalize();

		this.constant = - referencePoint.dot( normal );

		return this;

	}

	translate( offset ) {

		this.constant -= offset.dot( this.normal );

		return this;

	}

	equals( plane ) {

		return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

class PlaneGeometry extends BufferGeometry {

	constructor( width = 1, height = 1, widthSegments = 1, heightSegments = 1 ) {

		super();
		this.type = 'PlaneGeometry';

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments
		};

		const width_half = width / 2;
		const height_half = height / 2;

		const gridX = Math.floor( widthSegments );
		const gridY = Math.floor( heightSegments );

		const gridX1 = gridX + 1;
		const gridY1 = gridY + 1;

		const segment_width = width / gridX;
		const segment_height = height / gridY;

		//

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		for ( let iy = 0; iy < gridY1; iy ++ ) {

			const y = iy * segment_height - height_half;

			for ( let ix = 0; ix < gridX1; ix ++ ) {

				const x = ix * segment_width - width_half;

				vertices.push( x, - y, 0 );

				normals.push( 0, 0, 1 );

				uvs.push( ix / gridX );
				uvs.push( 1 - ( iy / gridY ) );

			}

		}

		for ( let iy = 0; iy < gridY; iy ++ ) {

			for ( let ix = 0; ix < gridX; ix ++ ) {

				const a = ix + gridX1 * iy;
				const b = ix + gridX1 * ( iy + 1 );
				const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				const d = ( ix + 1 ) + gridX1 * iy;

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		this.setIndex( indices );
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

	static fromJSON( data ) {

		return new PlaneGeometry( data.width, data.height, data.widthSegments, data.heightSegments );

	}

}

class CanvasTexture extends Texture {

	constructor( canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

		super( canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

		this.isCanvasTexture = true;

		this.needsUpdate = true;

	}

}

const Cache = {

	enabled: false,

	files: {},

	add: function ( key, file ) {

		if ( this.enabled === false ) return;

		// console.log( 'THREE.Cache', 'Adding key:', key );

		this.files[ key ] = file;

	},

	get: function ( key ) {

		if ( this.enabled === false ) return;

		// console.log( 'THREE.Cache', 'Checking key:', key );

		return this.files[ key ];

	},

	remove: function ( key ) {

		delete this.files[ key ];

	},

	clear: function () {

		this.files = {};

	}

};

class LoadingManager {

	constructor( onLoad, onProgress, onError ) {

		const scope = this;

		let isLoading = false;
		let itemsLoaded = 0;
		let itemsTotal = 0;
		let urlModifier = undefined;
		const handlers = [];

		// Refer to #5689 for the reason why we don't set .onStart
		// in the constructor

		this.onStart = undefined;
		this.onLoad = onLoad;
		this.onProgress = onProgress;
		this.onError = onError;

		this.itemStart = function ( url ) {

			itemsTotal ++;

			if ( isLoading === false ) {

				if ( scope.onStart !== undefined ) {

					scope.onStart( url, itemsLoaded, itemsTotal );

				}

			}

			isLoading = true;

		};

		this.itemEnd = function ( url ) {

			itemsLoaded ++;

			if ( scope.onProgress !== undefined ) {

				scope.onProgress( url, itemsLoaded, itemsTotal );

			}

			if ( itemsLoaded === itemsTotal ) {

				isLoading = false;

				if ( scope.onLoad !== undefined ) {

					scope.onLoad();

				}

			}

		};

		this.itemError = function ( url ) {

			if ( scope.onError !== undefined ) {

				scope.onError( url );

			}

		};

		this.resolveURL = function ( url ) {

			if ( urlModifier ) {

				return urlModifier( url );

			}

			return url;

		};

		this.setURLModifier = function ( transform ) {

			urlModifier = transform;

			return this;

		};

		this.addHandler = function ( regex, loader ) {

			handlers.push( regex, loader );

			return this;

		};

		this.removeHandler = function ( regex ) {

			const index = handlers.indexOf( regex );

			if ( index !== - 1 ) {

				handlers.splice( index, 2 );

			}

			return this;

		};

		this.getHandler = function ( file ) {

			for ( let i = 0, l = handlers.length; i < l; i += 2 ) {

				const regex = handlers[ i ];
				const loader = handlers[ i + 1 ];

				if ( regex.global ) regex.lastIndex = 0; // see #17920

				if ( regex.test( file ) ) {

					return loader;

				}

			}

			return null;

		};

	}

}

const DefaultLoadingManager = new LoadingManager();

class Loader {

	constructor( manager ) {

		this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

		this.crossOrigin = 'anonymous';
		this.withCredentials = false;
		this.path = '';
		this.resourcePath = '';
		this.requestHeader = {};

	}

	load( /* url, onLoad, onProgress, onError */ ) {}

	loadAsync( url, onProgress ) {

		const scope = this;

		return new Promise( function ( resolve, reject ) {

			scope.load( url, resolve, onProgress, reject );

		} );

	}

	parse( /* data */ ) {}

	setCrossOrigin( crossOrigin ) {

		this.crossOrigin = crossOrigin;
		return this;

	}

	setWithCredentials( value ) {

		this.withCredentials = value;
		return this;

	}

	setPath( path ) {

		this.path = path;
		return this;

	}

	setResourcePath( resourcePath ) {

		this.resourcePath = resourcePath;
		return this;

	}

	setRequestHeader( requestHeader ) {

		this.requestHeader = requestHeader;
		return this;

	}

}

const loading = {};

class FileLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		if ( url === undefined ) url = '';

		if ( this.path !== undefined ) url = this.path + url;

		url = this.manager.resolveURL( url );

		const cached = Cache.get( url );

		if ( cached !== undefined ) {

			this.manager.itemStart( url );

			setTimeout( () => {

				if ( onLoad ) onLoad( cached );

				this.manager.itemEnd( url );

			}, 0 );

			return cached;

		}

		// Check if request is duplicate

		if ( loading[ url ] !== undefined ) {

			loading[ url ].push( {

				onLoad: onLoad,
				onProgress: onProgress,
				onError: onError

			} );

			return;

		}

		// Initialise array for duplicate requests
		loading[ url ] = [];

		loading[ url ].push( {
			onLoad: onLoad,
			onProgress: onProgress,
			onError: onError,
		} );

		// create request
		const req = new Request( url, {
			headers: new Headers( this.requestHeader ),
			credentials: this.withCredentials ? 'include' : 'same-origin',
			// An abort controller could be added within a future PR
		} );

		// record states ( avoid data race )
		const mimeType = this.mimeType;
		const responseType = this.responseType;

		// start the fetch
		fetch( req )
			.then( response => {

				if ( response.status === 200 || response.status === 0 ) {

					// Some browsers return HTTP Status 0 when using non-http protocol
					// e.g. 'file://' or 'data://'. Handle as success.

					if ( response.status === 0 ) {

						console.warn( 'THREE.FileLoader: HTTP Status 0 received.' );

					}

					// Workaround: Checking if response.body === undefined for Alipay browser #23548

					if ( typeof ReadableStream === 'undefined' || response.body === undefined || response.body.getReader === undefined ) {

						return response;

					}

					const callbacks = loading[ url ];
					const reader = response.body.getReader();
					const contentLength = response.headers.get( 'Content-Length' );
					const total = contentLength ? parseInt( contentLength ) : 0;
					const lengthComputable = total !== 0;
					let loaded = 0;

					// periodically read data into the new stream tracking while download progress
					const stream = new ReadableStream( {
						start( controller ) {

							readData();

							function readData() {

								reader.read().then( ( { done, value } ) => {

									if ( done ) {

										controller.close();

									} else {

										loaded += value.byteLength;

										const event = new ProgressEvent( 'progress', { lengthComputable, loaded, total } );
										for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

											const callback = callbacks[ i ];
											if ( callback.onProgress ) callback.onProgress( event );

										}

										controller.enqueue( value );
										readData();

									}

								} );

							}

						}

					} );

					return new Response( stream );

				} else {

					throw Error( `fetch for "${response.url}" responded with ${response.status}: ${response.statusText}` );

				}

			} )
			.then( response => {

				switch ( responseType ) {

					case 'arraybuffer':

						return response.arrayBuffer();

					case 'blob':

						return response.blob();

					case 'document':

						return response.text()
							.then( text => {

								const parser = new DOMParser();
								return parser.parseFromString( text, mimeType );

							} );

					case 'json':

						return response.json();

					default:

						if ( mimeType === undefined ) {

							return response.text();

						} else {

							// sniff encoding
							const re = /charset="?([^;"\s]*)"?/i;
							const exec = re.exec( mimeType );
							const label = exec && exec[ 1 ] ? exec[ 1 ].toLowerCase() : undefined;
							const decoder = new TextDecoder( label );
							return response.arrayBuffer().then( ab => decoder.decode( ab ) );

						}

				}

			} )
			.then( data => {

				// Add to cache only on HTTP success, so that we do not cache
				// error response bodies as proper responses to requests.
				Cache.add( url, data );

				const callbacks = loading[ url ];
				delete loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

					const callback = callbacks[ i ];
					if ( callback.onLoad ) callback.onLoad( data );

				}

			} )
			.catch( err => {

				// Abort errors and other errors are handled the same

				const callbacks = loading[ url ];

				if ( callbacks === undefined ) {

					// When onLoad was called and url was deleted in `loading`
					this.manager.itemError( url );
					throw err;

				}

				delete loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

					const callback = callbacks[ i ];
					if ( callback.onError ) callback.onError( err );

				}

				this.manager.itemError( url );

			} )
			.finally( () => {

				this.manager.itemEnd( url );

			} );

		this.manager.itemStart( url );

	}

	setResponseType( value ) {

		this.responseType = value;
		return this;

	}

	setMimeType( value ) {

		this.mimeType = value;
		return this;

	}

}

class ImageLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		if ( this.path !== undefined ) url = this.path + url;

		url = this.manager.resolveURL( url );

		const scope = this;

		const cached = Cache.get( url );

		if ( cached !== undefined ) {

			scope.manager.itemStart( url );

			setTimeout( function () {

				if ( onLoad ) onLoad( cached );

				scope.manager.itemEnd( url );

			}, 0 );

			return cached;

		}

		const image = createElementNS( 'img' );

		function onImageLoad() {

			removeEventListeners();

			Cache.add( url, this );

			if ( onLoad ) onLoad( this );

			scope.manager.itemEnd( url );

		}

		function onImageError( event ) {

			removeEventListeners();

			if ( onError ) onError( event );

			scope.manager.itemError( url );
			scope.manager.itemEnd( url );

		}

		function removeEventListeners() {

			image.removeEventListener( 'load', onImageLoad, false );
			image.removeEventListener( 'error', onImageError, false );

		}

		image.addEventListener( 'load', onImageLoad, false );
		image.addEventListener( 'error', onImageError, false );

		if ( url.slice( 0, 5 ) !== 'data:' ) {

			if ( this.crossOrigin !== undefined ) image.crossOrigin = this.crossOrigin;

		}

		scope.manager.itemStart( url );

		image.src = url;

		return image;

	}

}

class TextureLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		const texture = new Texture();

		const loader = new ImageLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.setPath( this.path );

		loader.load( url, function ( image ) {

			texture.image = image;
			texture.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

		return texture;

	}

}

if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

	__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'register', { detail: {
		revision: REVISION,
	} } ) );

}

if ( typeof window !== 'undefined' ) {

	if ( window.__THREE__ ) {

		console.warn( 'WARNING: Multiple instances of Three.js being imported.' );

	} else {

		window.__THREE__ = REVISION;

	}

}

const ROW = "row";
const ROW_REVERSE = "row-reverse";
const COLUMN = "column";
const COLUMN_REVERSE = "column-reverse";

function contentDirection( container, DIRECTION, startPos, REVERSE ){

	// end to end children
	let accu = startPos;

	let childGetSize = "getWidth";
	let axisPrimary = "x";
	let axisSecondary = "y";

	if( DIRECTION.indexOf( COLUMN ) === 0 ){

		childGetSize = "getHeight";
		axisPrimary = "y";
		axisSecondary = "x";

	}

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < container.childrenBoxes.length; i++ ) {

		const child = container.childrenBoxes[ i ];

		const CHILD_ID = child.id;
		const CHILD_SIZE = child[childGetSize]();
		const CHILD_MARGIN = child.margin || 0;

		accu += CHILD_MARGIN * REVERSE;

		container.childrenPos[ CHILD_ID ] = {
			[axisPrimary]: accu + ( ( CHILD_SIZE / 2 ) * REVERSE ),
			[axisSecondary]: 0
		};

		// update accu for next children
		accu += ( REVERSE * ( CHILD_SIZE + CHILD_MARGIN ) );

	}

}

var ContentDirection = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ROW: ROW,
	ROW_REVERSE: ROW_REVERSE,
	COLUMN: COLUMN,
	COLUMN_REVERSE: COLUMN_REVERSE,
	contentDirection: contentDirection
});

const START$1 = "start";
const CENTER$2 = "center";
const END$1 = "end";
const STRETCH = "stretch"; // Still bit experimental

function alignItems( boxComponent, DIRECTION){

	const ALIGNMENT = boxComponent.getAlignItems();
	if( AVAILABLE_ALIGN_ITEMS.indexOf(ALIGNMENT) === -1 ){

		console.warn( `alignItems === '${ALIGNMENT}' is not supported` );

	}

	let getSizeMethod = "getWidth";
	let axis = "x";
	if( DIRECTION.indexOf( ROW ) === 0 ){

		getSizeMethod = "getHeight";
		axis = "y";

	}
	const AXIS_TARGET = ( boxComponent[getSizeMethod]() / 2 ) - ( boxComponent.padding || 0 );

	boxComponent.childrenBoxes.forEach( ( child ) => {

		let offset;

		switch ( ALIGNMENT ){

			case END$1:
			case 'right': // @TODO : Deprecated and will be remove upon 7.x.x
			case 'bottom': // @TODO : Deprecated and will be remove upon 7.x.x
				if( DIRECTION.indexOf( ROW ) === 0 ){

					offset = - AXIS_TARGET + ( child[getSizeMethod]() / 2 ) + ( child.margin || 0 );

				}else {

					offset = AXIS_TARGET - ( child[getSizeMethod]() / 2 ) - ( child.margin || 0 );

				}

				break;

			case START$1:
			case 'left': // @TODO : Deprecated and will be remove upon 7.x.x
			case 'top': // @TODO : Deprecated and will be remove upon 7.x.x
				if( DIRECTION.indexOf( ROW ) === 0 ){

					offset = AXIS_TARGET - ( child[getSizeMethod]() / 2 ) - ( child.margin || 0 );

				}else {

					offset = - AXIS_TARGET + ( child[getSizeMethod]() / 2 ) + ( child.margin || 0 );

				}

				break;
		}

		boxComponent.childrenPos[ child.id ][axis] = offset || 0;

	} );

}

/**
 * @deprecated
 * // @TODO: Be remove upon 7.x.x
 * @param alignment
 */
function warnAboutDeprecatedAlignItems( alignment ){

	if( DEPRECATED_ALIGN_ITEMS.indexOf(alignment) !== - 1){

		console.warn(`alignItems === '${alignment}' is deprecated and will be remove in 7.x.x. Fallback are 'start'|'end'`);

	}

}

const AVAILABLE_ALIGN_ITEMS = [
	START$1,
	CENTER$2,
	END$1,
	STRETCH,
	'top', // @TODO: Be remove upon 7.x.x
	'right', // @TODO: Be remove upon 7.x.x
	'bottom', // @TODO: Be remove upon 7.x.x
	'left' // @TODO: Be remove upon 7.x.x
];

// @TODO: Be remove upon 7.x.x
const DEPRECATED_ALIGN_ITEMS = [
	'top',
	'right',
	'bottom',
	'left'
];

var AlignItems = /*#__PURE__*/Object.freeze({
	__proto__: null,
	START: START$1,
	CENTER: CENTER$2,
	END: END$1,
	STRETCH: STRETCH,
	alignItems: alignItems,
	warnAboutDeprecatedAlignItems: warnAboutDeprecatedAlignItems
});

const START = "start";
const CENTER$1 = "center";
const END = "end";
const SPACE_AROUND = 'space-around';
const SPACE_BETWEEN = 'space-between';
const SPACE_EVENLY = 'space-evenly';

function justifyContent( boxComponent, direction, startPos, REVERSE){

	const JUSTIFICATION = boxComponent.getJustifyContent();
	if ( AVAILABLE_JUSTIFICATIONS.indexOf( JUSTIFICATION ) === -1 ) {

		console.warn( `justifyContent === '${ JUSTIFICATION }' is not supported` );

	}

	const side = direction.indexOf('row') === 0 ? 'width' : 'height';
	const usedDirectionSpace = boxComponent.getChildrenSideSum( side );

	const INNER_SIZE = side === 'width' ? boxComponent.getInnerWidth() : boxComponent.getInnerHeight();
	const remainingSpace = INNER_SIZE - usedDirectionSpace;

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	// const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * REVERSE );
	const justificationOffset = _getJustificationOffset( JUSTIFICATION, axisOffset );

	// Items margin
	const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );

	// Apply
	const axis = direction.indexOf( 'row' ) === 0 ? "x" : "y";
	boxComponent.childrenBoxes.forEach( ( child , childIndex ) => {

		boxComponent.childrenPos[ child.id ][axis] -= justificationOffset - justificationMargins[childIndex];

	} );
}

const AVAILABLE_JUSTIFICATIONS = [
	START,
	CENTER$1,
	END,
	SPACE_AROUND,
	SPACE_BETWEEN,
	SPACE_EVENLY
];

/**
 *
 * @param {string} justification
 * @param {number} axisOffset
 * @returns {number}
 */
function _getJustificationOffset( justification, axisOffset ){

	// Only end and center have justification offset
	switch ( justification ){

		case END:
			return axisOffset;

		case CENTER$1:
			return axisOffset / 2;
	}

	return 0;
}

/**
 *
 * @param items
 * @param spaceToDistribute
 * @param justification
 * @param reverse
 * @returns {any[]}
 */
function _getJustificationMargin( items, spaceToDistribute, justification, reverse ){

	const justificationMargins = Array( items.length ).fill( 0 );

	if ( spaceToDistribute > 0 ) {

		// Only space-*  have justification margin betweem items
		switch ( justification ) {

			case SPACE_BETWEEN:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length - 1 ) * reverse;
					// set this margin for any children

					// except for first child
					justificationMargins[ 0 ] = 0;

					for ( let i = 1; i < items.length; i++ ) {

						justificationMargins[ i ] = margin * i;

					}

				}

				break;

			case SPACE_EVENLY:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length + 1 ) * reverse;

					// set this margin for any children
					for ( let i = 0; i < items.length; i++ ) {

						justificationMargins[ i ] = margin * ( i + 1 );

					}

				}

				break;

			case SPACE_AROUND:
				// only one children would act as start
				if ( items.length > 1 ) {

					const margin = spaceToDistribute / ( items.length ) * reverse;

					const start = margin / 2;
					justificationMargins[ 0 ] = start;

					// set this margin for any children
					for ( let i = 1; i < items.length; i++ ) {

						justificationMargins[ i ] = start + margin * i;

					}

				}

				break;

		}

	}

	return justificationMargins;

}

var JustifyContent = /*#__PURE__*/Object.freeze({
	__proto__: null,
	START: START,
	CENTER: CENTER$1,
	END: END,
	SPACE_AROUND: SPACE_AROUND,
	SPACE_BETWEEN: SPACE_BETWEEN,
	SPACE_EVENLY: SPACE_EVENLY,
	justifyContent: justifyContent
});

/**

Job: Handle everything related to a BoxComponent element dimensioning and positioning

Knows: Parents and children dimensions and positions

It's worth noting that in three-mesh-ui, it's the parent Block that computes
its children position. A Block can only have either only box components (Block)
as children, or only inline components (Text, InlineBlock).

 */

function BoxComponent( Base ) {

	return class BoxComponent extends Base {

		constructor( options ) {

			super( options );

			this.isBoxComponent = true;
			this.childrenPos = {};

		}


		/** Get width of this component minus its padding */
		getInnerWidth() {

			const DIRECTION = this.getContentDirection();

			switch ( DIRECTION ) {

				case 'row' :
				case 'row-reverse' :
					return this.width - ( this.padding * 2 || 0 ) || this.getChildrenSideSum( 'width' );

				case 'column' :
				case 'column-reverse' :
					return this.getHighestChildSizeOn( 'width' );

				default :
					console.error( `Invalid contentDirection : ${DIRECTION}` );
					break;

			}

		}

		/** Get height of this component minus its padding */
		getInnerHeight() {

			const DIRECTION = this.getContentDirection();

			switch ( DIRECTION ) {

				case 'row' :
				case 'row-reverse' :
					return this.getHighestChildSizeOn( 'height' );

				case 'column' :
				case 'column-reverse' :
					return this.height - ( this.padding * 2 || 0 ) || this.getChildrenSideSum( 'height' );

				default :
					console.error( `Invalid contentDirection : ${DIRECTION}` );
					break;

			}

		}

		/** Return the sum of all this component's children sides + their margin */
		getChildrenSideSum( dimension ) {

			return this.childrenBoxes.reduce( ( accu, child ) => {

				const margin = ( child.margin * 2 ) || 0;

				const CHILD_SIZE = ( dimension === 'width' ) ?
					( child.getWidth() + margin ) :
					( child.getHeight() + margin );

				return accu + CHILD_SIZE;

			}, 0 );

		}

		/** Look in parent record what is the instructed position for this component, then set its position */
		setPosFromParentRecords() {

			if ( this.parentUI && this.parentUI.childrenPos[ this.id ] ) {

				this.position.x = ( this.parentUI.childrenPos[ this.id ].x );
				this.position.y = ( this.parentUI.childrenPos[ this.id ].y );

			}

		}

		/** Position inner elements according to dimensions and layout parameters. */
		computeChildrenPosition() {

			if ( this.children.length > 0 ) {

				const DIRECTION = this.getContentDirection();
				let directionalOffset;

				switch ( DIRECTION ) {

					case ROW :
						directionalOffset = - this.getInnerWidth() / 2;
						break;

					case ROW_REVERSE :
						directionalOffset = this.getInnerWidth() / 2;
						break;

					case COLUMN :
						directionalOffset = this.getInnerHeight() / 2;
						break;

					case COLUMN_REVERSE :
						directionalOffset = - this.getInnerHeight() / 2;
						break;

				}

				const REVERSE = - Math.sign( directionalOffset );

				contentDirection(this, DIRECTION, directionalOffset, REVERSE );
				justifyContent(this, DIRECTION, directionalOffset, REVERSE );
				alignItems( this, DIRECTION );
			}

		}

		/**
		 * Returns the highest linear dimension among all the children of the passed component
		 * MARGIN INCLUDED
		 */
		getHighestChildSizeOn( direction ) {

			return this.childrenBoxes.reduce( ( accu, child ) => {

				const margin = child.margin || 0;
				const maxSize = direction === 'width' ?
					child.getWidth() + ( margin * 2 ) :
					child.getHeight() + ( margin * 2 );

				return Math.max( accu, maxSize );

			}, 0 );

		}

		/**
		 * Get width of this element
		 * With padding, without margin
		 */
		getWidth() {


			// This is for stretch alignment
			// @TODO : Conceive a better performant way
			if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' ){

				if( this.parentUI.getContentDirection().indexOf('column') !== -1 ){

					return this.parentUI.getWidth() -  ( this.parentUI.padding * 2 || 0 );

				}

			}


			return this.width || this.getInnerWidth() + ( this.padding * 2 || 0 );

		}

		/**
		 * Get height of this element
		 * With padding, without margin
		 */
		getHeight() {

			// This is for stretch alignment
			// @TODO : Conceive a better performant way
			if( this.parentUI && this.parentUI.getAlignItems() === 'stretch' ){

				if( this.parentUI.getContentDirection().indexOf('row') !== -1 ){

					return this.parentUI.getHeight() - ( this.parentUI.padding * 2 || 0 );

				}

			}

			return this.height || this.getInnerHeight() + ( this.padding * 2 || 0 );

		}

	};

}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace#whitespace_helper_functions
 *
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 **/
const WHITE_CHARS = { '\t': '\u0009', '\n': '\u000A', '\r': '\u000D', ' ': '\u0020' };

const NORMAL = 'normal';
const NOWRAP = 'nowrap';
const PRE = 'pre';
const PRE_LINE = 'pre-line';
const PRE_WRAP = 'pre-wrap';

/**
 * Collapse whitespaces and sequence of whitespaces on string
 *
 * @param textContent
 * @param whiteSpace
 * @returns {*}
 */
const collapseWhitespaceOnString = function ( textContent, whiteSpace ) {

	switch ( whiteSpace ) {

		case NOWRAP:
		case NORMAL:
			// newlines are treated as other whitespace characters
			textContent = textContent.replace( /\n/g, ' ' );
		//falls through

		case PRE_LINE:
			// collapsed white spaces sequences
			textContent = textContent.replace( /[ ]{2,}/g, ' ' );
			break;

	}

	return textContent;

};

/**
 * Get the breakability of a newline character according to white-space property
 *
 * @param whiteSpace
 * @returns {string}
 */
const newlineBreakability = function ( whiteSpace ) {

	switch ( whiteSpace ) {

		case PRE:
		case PRE_WRAP:
		case PRE_LINE:
			return 'mandatory';
		// do not automatically break on newline

	}

};

/**
 * Check for breaks in inlines according to whiteSpace value
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @returns {boolean}
 */
const shouldBreak = function( inlines, i, lastInlineOffset, options){
	const inline = inlines[i];

	switch ( options.WHITESPACE ){

		case NORMAL:
		case PRE_LINE:
		case PRE_WRAP:

			// prevent additional computation if line break is mandatory
			if( inline.lineBreak === 'mandatory' ) return true;


			const kerning = inline.kerning ? inline.kerning : 0;
			const xoffset = inline.xoffset ? inline.xoffset : 0;
			const xadvance = inline.xadvance ? inline.xadvance : inline.width;

			// prevent additional computation if this character already exceed the available size
			if( lastInlineOffset + xadvance + xoffset + kerning > options.INNER_WIDTH ) return true;


			const nextBreak = _distanceToNextBreak( inlines, i, options );
			return _shouldFriendlyBreak( inlines[ i - 1 ], lastInlineOffset, nextBreak, options );

		case PRE:
			return inline.lineBreak === 'mandatory';

		case NOWRAP:
		default:
			return false;
	}
};


/**
 * Alter a line of inlines according to white-space property
 * @param line
 * @param {('normal'|'pre-wrap'|'pre-line')} whiteSpace
 */
const collapseWhitespaceOnInlines = function ( line, whiteSpace ) {

	const firstInline = line[ 0 ];
	const lastInline = line[ line.length - 1 ];

	// @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
	//
	// current implementation is 'pre-line'
	// if the breaking character is a space, get the previous one
	switch ( whiteSpace ) {

		// trim/collapse first and last whitespace characters of a line
		case PRE_WRAP:
			// only process whiteChars glyphs inlines
			// if( firstInline.glyph && whiteChars[firstInline.glyph] && line.length > 1 ){
			if ( firstInline.glyph && firstInline.glyph === '\n' && line.length > 1 ) {

				_collapseLeftInlines( [ firstInline ], line[ 1 ] );

			}

			// if( lastInline.glyph && whiteChars[lastInline.glyph] && line.length > 1 ){
			if ( lastInline.glyph && lastInline.glyph === '\n' && line.length > 1 ) {

				_collapseRightInlines( [ lastInline ], line[ line.length - 2 ] );

			}

			break;


		case PRE_LINE:
		case NOWRAP:
		case NORMAL:
			let inlinesToCollapse = [];
			let collapsingTarget;
			// collect starting whitespaces to collapse
			for ( let i = 0; i < line.length; i++ ) {

				const inline = line[ i ];

				if ( inline.glyph && WHITE_CHARS[ inline.glyph ] && line.length > i ) {

					inlinesToCollapse.push( inline );
					collapsingTarget = line[ i + 1 ];
					continue;

				}

				break;

			}

			_collapseLeftInlines( inlinesToCollapse, collapsingTarget );


			inlinesToCollapse = [];
			collapsingTarget = null;
			// collect ending whitespace to collapse
			for ( let i = line.length - 1; i > 0; i-- ) {

				const inline = line[ i ];
				if ( inline.glyph && WHITE_CHARS[ inline.glyph ] && i > 0 ) {

					inlinesToCollapse.push( inline );
					collapsingTarget = line[ i - 1 ];
					continue;

				}

				break;

			}

			_collapseRightInlines( inlinesToCollapse, collapsingTarget );
			break;

		case PRE:
			break;


		default:
			console.warn( `whiteSpace: '${whiteSpace}' is not valid` );
			return 0;

	}

	return firstInline.offsetX;

};


/***********************************************************************************************************************
 * Internal logics
 **********************************************************************************************************************/


/**
 * Visually collapse inlines from right to left ( endtrim )
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseRightInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.width = 0;
		inline.height = 0;
		inline.offsetX = targetInline.offsetX + targetInline.width;

	}

}

/**
 * Visually collapse inlines from left to right (starttrim)
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseLeftInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.width = 0;
		inline.height = 0;
		inline.offsetX = targetInline.offsetX;

	}

}

/**
 * get the distance in world coord to the next glyph defined
 * as break-line-safe ( like whitespace for instance )
 * @private
 */
function _distanceToNextBreak( inlines, currentIdx, options, accu ) {

	accu = accu || 0;

	// end of the text
	if ( !inlines[ currentIdx ] ) return accu;

	const inline = inlines[ currentIdx ];
	const kerning = inline.kerning ? inline.kerning : 0;
	const xoffset = inline.xoffset ? inline.xoffset : 0;
	const xadvance = inline.xadvance ? inline.xadvance : inline.width;

	// if inline.lineBreak is set, it is 'mandatory' or 'possible'
	if ( inline.lineBreak ) return accu + xadvance;

	// no line break is possible on this character
	return _distanceToNextBreak(
		inlines,
		currentIdx + 1,
		options,
		accu + xadvance + options.LETTERSPACING + xoffset + kerning
	);

}

/**
 * Test if we should line break here even if the current glyph is not out of boundary.
 * It might be necessary if the last glyph was break-line-friendly (whitespace, hyphen..)
 * and the distance to the next friendly glyph is out of boundary.
 */
function _shouldFriendlyBreak( prevChar, lastInlineOffset, nextBreak, options ) {

	// We can't check if last glyph is break-line-friendly it does not exist
	if ( !prevChar || !prevChar.glyph ) return false;

	// Next break-line-friendly glyph is inside boundary
	if ( lastInlineOffset + nextBreak < options.INNER_WIDTH ) return false;

	// Previous glyph was break-line-friendly
	return options.BREAKON.indexOf( prevChar.glyph ) > -1;

}

var Whitespace = /*#__PURE__*/Object.freeze({
	__proto__: null,
	WHITE_CHARS: WHITE_CHARS,
	NORMAL: NORMAL,
	NOWRAP: NOWRAP,
	PRE: PRE,
	PRE_LINE: PRE_LINE,
	PRE_WRAP: PRE_WRAP,
	collapseWhitespaceOnString: collapseWhitespaceOnString,
	newlineBreakability: newlineBreakability,
	shouldBreak: shouldBreak,
	collapseWhitespaceOnInlines: collapseWhitespaceOnInlines
});

const LEFT = 'left';
const RIGHT = 'right';
const CENTER = 'center';
const JUSTIFY = 'justify';
const JUSTIFY_LEFT = 'justify-left';
const JUSTIFY_RIGHT = 'justify-right';
const JUSTIFY_CENTER = 'justify-center';

function textAlign( lines, ALIGNMENT, INNER_WIDTH ) {

	// Start the alignment by sticking to directions : left, right, center
	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];

		// compute the alignment offset of the line
		const offsetX = _computeLineOffset( line, ALIGNMENT, INNER_WIDTH, i === lines.length - 1 );

		// apply the offset to each characters of the line
		for ( let j = 0; j < line.length; j++ ) {

			line[ j ].offsetX += offsetX;

		}

	}

	// last operations for justifications alignments
	if ( ALIGNMENT.indexOf( JUSTIFY ) === 0 ) {

		for ( let i = 0; i < lines.length; i++ ) {

			const line = lines[ i ];


			// do not process last line for justify-left or justify-right
			if ( ALIGNMENT.indexOf( '-' ) !== -1 && i === lines.length - 1 ) return;

			// can only justify is space is remaining
			const REMAINING_SPACE = INNER_WIDTH - line.width;
			if ( REMAINING_SPACE <= 0 ) return;

			// count the valid spaces to extend
			// Do not take the first nor the last space into account
			let validSpaces = 0;
			for ( let j = 1; j < line.length - 1; j++ ) {

				validSpaces += line[ j ].glyph === ' ' ? 1 : 0;

			}
			const additionalSpace = REMAINING_SPACE / validSpaces;


			// for right justification, process the loop in reverse
			let inverter = 1;
			if ( ALIGNMENT === JUSTIFY_RIGHT ) {

				line.reverse();
				inverter = -1;

			}

			let incrementalOffsetX = 0;

			// start at ONE to avoid first space
			for ( let j = 1; j <= line.length - 1; j++ ) {

				// apply offset on each char
				const char = line[ j ];
				char.offsetX += incrementalOffsetX * inverter;

				// and increase it when space
				incrementalOffsetX += char.glyph === ' ' ? additionalSpace : 0;

			}

			// for right justification, the loop was processed in reverse
			if ( ALIGNMENT === JUSTIFY_RIGHT ) {
				line.reverse();
			}


		}

	}

}


const _computeLineOffset = ( line, ALIGNMENT, INNER_WIDTH, lastLine ) => {

	switch ( ALIGNMENT ) {

		case JUSTIFY_LEFT:
		case JUSTIFY:
		case LEFT:
			return -INNER_WIDTH / 2;

		case JUSTIFY_RIGHT:
		case RIGHT:
			return -line.width + ( INNER_WIDTH / 2 );


		case CENTER:
			return -line.width / 2;

		case JUSTIFY_CENTER:
			if ( lastLine ) {

				// center alignement
				return -line.width / 2;

			}

				// left alignment
				return -INNER_WIDTH / 2;

		default:
			console.warn( `textAlign: '${ALIGNMENT}' is not valid` );

	}

};

var TextAlign = /*#__PURE__*/Object.freeze({
	__proto__: null,
	LEFT: LEFT,
	RIGHT: RIGHT,
	CENTER: CENTER,
	JUSTIFY: JUSTIFY,
	JUSTIFY_LEFT: JUSTIFY_LEFT,
	JUSTIFY_RIGHT: JUSTIFY_RIGHT,
	JUSTIFY_CENTER: JUSTIFY_CENTER,
	textAlign: textAlign
});

/**

Job: Positioning inline elements according to their dimensions inside this component

Knows: This component dimensions, and its children dimensions

This module is used for Block composition (Object.assign). A Block is responsible
for the positioning of its inline elements. In order for it to know what is the
size of these inline components, parseParams must be called on its children first.

It's worth noting that a Text is not positioned as a whole, but letter per letter,
in order to create a line break when necessary. It's Text that merge the various letters
in its own updateLayout function.

 */

function InlineManager( Base ) {

	return class InlineManager extends Base {

		/** Compute children .inlines objects position, according to their pre-computed dimensions */
		computeInlinesPosition() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - ( this.padding * 2 || 0 );
			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			// got by MeshUIComponent
			const JUSTIFICATION = this.getJustifyContent();
			const ALIGNMENT = this.getTextAlign();

			const INTERLINE = this.getInterLine();

			// Compute lines
			const lines = this.computeLines();

			/////////////////////////////////////////////////////////////////
			// Position lines according to justifyContent and contentAlign
			/////////////////////////////////////////////////////////////////

			// individual vertical offset

			let textHeight = lines.reduce( ( offsetY, line, i, arr ) => {

				const charAlignement = line.lineHeight - line.lineBase;

				line.forEach( ( inline ) => {

					inline.offsetY = offsetY - line.lineHeight + charAlignement + arr[ 0 ].lineHeight;

				} );

				return offsetY - line.lineHeight - INTERLINE;

			}, 0 ) + INTERLINE;

			//

			textHeight = Math.abs( textHeight );

			// Line vertical positioning

			const justificationOffset = ( () => {
				switch ( JUSTIFICATION ) {

					case 'start':
						return ( INNER_HEIGHT / 2 ) - lines[ 0 ].lineHeight;
					case 'end':
						return textHeight - lines[ 0 ].lineHeight - ( INNER_HEIGHT / 2 ) + ( lines[ lines.length - 1 ].lineHeight - lines[ lines.length - 1 ].lineHeight );
					case 'center':
						return ( textHeight / 2 ) - lines[ 0 ].lineHeight;
					default:
						console.warn( `justifyContent: '${JUSTIFICATION}' is not valid` );

				}
			} )();

			// const justificationOffset = 0;

			//

			lines.forEach( ( line ) => {

				line.forEach( ( inline ) => {

					inline.offsetY += justificationOffset;

				} );

			} );

			// Horizontal positioning
			textAlign( lines, ALIGNMENT, INNER_WIDTH );


			// Make lines accessible to provide helpful informations
			this.lines = lines;

		}


		calculateBestFit( bestFit ) {

			if ( this.childrenInlines.length === 0 ) return;

			switch ( bestFit ) {
				case 'grow':
					this.calculateGrowFit();
					break;
				case 'shrink':
					this.calculateShrinkFit();
					break;
				case 'auto':
					this.calculateAutoFit();
					break;
			}

		}

		calculateGrowFit() {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			//Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 1;
			let maxFontMultiplier = 2;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					if ( fontMultiplier <= minFontMultiplier ) { // can't shrink text

						this.childrenInlines.forEach( inlineComponent => {

							if ( inlineComponent.isInlineBlock ) return;

							// ensure fontSize does not shrink
							inlineComponent._fitFontSize = inlineComponent.getFontSize();

						} );

						break;

					}

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );

		}

		calculateShrinkFit() {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			// Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 0;
			let maxFontMultiplier = 1;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( fontMultiplier >= maxFontMultiplier ) { // can't grow text

						this.childrenInlines.forEach( inlineComponent => {

							if ( inlineComponent.isInlineBlock ) return;

							// ensure fontSize does not grow
							inlineComponent._fitFontSize = inlineComponent.getFontSize();

						} );

						break;

					}

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );
		}

		calculateAutoFit()  {

			const INNER_HEIGHT = this.getHeight() - ( this.padding * 2 || 0 );

			//Iterative method to find a fontSize of text children that text will fit into container
			let iterations = 1;
			const heightTolerance = 0.075;
			const firstText = this.childrenInlines.find( inlineComponent => inlineComponent.isText );

			let minFontMultiplier = 0;
			let maxFontMultiplier = 2;
			let fontMultiplier = firstText._fitFontSize ? firstText._fitFontSize / firstText.getFontSize() : 1;
			let textHeight;

			do {

				textHeight = this.calculateHeight( fontMultiplier );

				if ( textHeight > INNER_HEIGHT ) {

					maxFontMultiplier = fontMultiplier;
					fontMultiplier -= ( maxFontMultiplier - minFontMultiplier ) / 2;

				} else {

					if ( Math.abs( INNER_HEIGHT - textHeight ) < heightTolerance ) break;

					if ( Math.abs( fontMultiplier - maxFontMultiplier ) < 5e-10 ) maxFontMultiplier *= 2;

					minFontMultiplier = fontMultiplier;
					fontMultiplier += ( maxFontMultiplier - minFontMultiplier ) / 2;

				}

			} while ( ++iterations <= 10 );
		}

		/**
		 * computes lines based on children's inlines array.
		 * @private
		 */
		computeLines() {

			// computed by BoxComponent
			const INNER_WIDTH = this.getWidth() - ( this.padding * 2 || 0 );

			// Will stock the characters of each line, so that we can
			// correct lines position before to merge
			const lines = [ [] ];

			this.childrenInlines.reduce( ( lastInlineOffset, inlineComponent ) => {

					// Abort condition

					if ( !inlineComponent.inlines ) return;

					//////////////////////////////////////////////////////////////
					// Compute offset of each children according to its dimensions
					//////////////////////////////////////////////////////////////

					const FONTSIZE = inlineComponent._fitFontSize || inlineComponent.getFontSize();
					const LETTERSPACING = inlineComponent.isText ? inlineComponent.getLetterSpacing() * FONTSIZE : 0;
					const WHITESPACE = inlineComponent.getWhiteSpace();
					const BREAKON = inlineComponent.getBreakOn();

					const whiteSpaceOptions = {
						WHITESPACE,
						LETTERSPACING,
						BREAKON,
						INNER_WIDTH
					};

					const currentInlineInfo = inlineComponent.inlines.reduce( ( lastInlineOffset, inline, i, inlines ) => {

						const kerning = inline.kerning ? inline.kerning : 0;
						const xoffset = inline.xoffset ? inline.xoffset : 0;
						const xadvance = inline.xadvance ? inline.xadvance : inline.width;

						// Line break
						const shouldBreak$1 = shouldBreak(inlines,i,lastInlineOffset, whiteSpaceOptions );

						if ( shouldBreak$1 ) {

							lines.push( [ inline ] );

							inline.offsetX = xoffset;

							// restart the lastInlineOffset as zero.
							if ( inline.width === 0 ) return 0;

							// compute lastInlineOffset normally
							// except for kerning which won't apply
							// as there is visually no lefthanded glyph to kern with
							return xadvance + LETTERSPACING;

						}

						lines[ lines.length - 1 ].push( inline );

						inline.offsetX = lastInlineOffset + xoffset + kerning;

						return lastInlineOffset + xadvance + kerning + LETTERSPACING;

					}, lastInlineOffset );

					//

					return currentInlineInfo;

				}, 0 );

			// Compute lines dimensions

			lines.forEach( ( line ) => {

				//

				line.lineHeight = line.reduce( ( height, inline ) => {

					const charHeight = inline.lineHeight !== undefined ? inline.lineHeight : inline.height;

					return Math.max( height, charHeight );

				}, 0 );

				//

				line.lineBase = line.reduce( ( lineBase, inline ) => {

					const newLineBase = inline.lineBase !== undefined ? inline.lineBase : inline.height;

					return Math.max( lineBase, newLineBase );

				}, 0 );

				//

				line.width = 0;
				const lineHasInlines = line[ 0 ];

				if ( lineHasInlines ) {

					// starts by processing whitespace, it will return a collapsed left offset
					const WHITESPACE = this.getWhiteSpace();
					const whiteSpaceOffset = collapseWhitespaceOnInlines( line, WHITESPACE );

					// apply the collapsed left offset to ensure the starting offset is 0
					line.forEach( ( inline ) => {

						inline.offsetX -= whiteSpaceOffset;

					} );

					// compute its width: length from firstInline:LEFT to lastInline:RIGHT
					line.width = this.computeLineWidth( line );

				}

			} );

			return lines;
		}

		calculateHeight( fontMultiplier ) {

			this.childrenInlines.forEach( inlineComponent => {

				if ( inlineComponent.isInlineBlock ) return;

				// Set font size and recalculate dimensions
				inlineComponent._fitFontSize = inlineComponent.getFontSize() * fontMultiplier;
				inlineComponent.calculateInlines( inlineComponent._fitFontSize );

			} );

			const lines = this.computeLines();

			const INTERLINE = this.getInterLine();

			const textHeight = lines.reduce( ( offsetY, line ) => {

				return offsetY - line.lineHeight - INTERLINE;

			}, 0 ) + INTERLINE;

			return Math.abs( textHeight );
		}

		/**
		 * Compute the width of a line
		 * @param line
		 * @returns {number}
		 */
		computeLineWidth( line ) {

			// only by the length of its extremities
			const firstInline = line[ 0 ];

			const lastInline = line[ line.length - 1 ];

			// Right + Left ( left is negative )
			return (lastInline.offsetX + lastInline.width) + firstInline.offsetX;

		}

	};

}

/*

Job:
Keeping record of all the loaded fonts, which component use which font,
and load new fonts if necessary

Knows: Which component use which font, loaded fonts

This is one of the only modules in the 'component' folder that is not used
for composition (Object.assign). MeshUIComponent is the only module with
a reference to it, it uses FontLibrary for recording fonts accross components.
This way, if a component uses the same font as another, FontLibrary will skip
loading it twice, even if the two component are not in the same parent/child hierarchy

*/

const fileLoader = new FileLoader();
const requiredFontFamilies = [];
const fontFamilies = {};

const textureLoader$1 = new TextureLoader();
const requiredFontTextures = [];
const fontTextures = {};

const records = {};

/**

Called by MeshUIComponent after fontFamily was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

 */
function setFontFamily( component, fontFamily ) {

	if ( typeof fontFamily === 'string' ) {

		loadFontJSON( component, fontFamily );

	} else {

		// keep record of the font that this component use
		if ( !records[ component.id ] ) records[ component.id ] = { component };

		// Ensure the font json is processed
		_buildFriendlyKerningValues( fontFamily );

		records[ component.id ].json = fontFamily;

		component._updateFontFamily( fontFamily );

	}

}

/**

Called by MeshUIComponent after fontTexture was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

 */
function setFontTexture( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontTextures.indexOf( url ) === -1 ) {

		requiredFontTextures.push( url );

		textureLoader$1.load( url, ( texture ) => {

			texture.generateMipmaps = false;
			texture.minFilter = LinearFilter;
			texture.magFilter = LinearFilter;

			fontTextures[ url ] = texture;

			for ( const recordID of Object.keys( records ) ) {

				if ( url === records[ recordID ].textureURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontTexture( texture );

				}

			}

		} );

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = { component };

	records[ component.id ].textureURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontTextures[ url ] ) {

		component._updateFontTexture( fontTextures[ url ] );

	}

}

/** used by Text to know if a warning must be thrown */
function getFontOf( component ) {

	const record = records[ component.id ];

	if ( !record && component.parentUI ) {

		return getFontOf( component.parentUI );

	}

	return record;

}

/** Load JSON file at the url provided by the user at the component attribute 'fontFamily' */
function loadFontJSON( component, url ) {

	// if this font was never asked for, we load it
	if ( requiredFontFamilies.indexOf( url ) === -1 ) {

		requiredFontFamilies.push( url );

		fileLoader.load( url, ( text ) => {

			// FileLoader import as  a JSON string
			const font = JSON.parse( text );

			// Ensure the font json is processed
			_buildFriendlyKerningValues( font );

			fontFamilies[ url ] = font;

			for ( const recordID of Object.keys( records ) ) {

				if ( url === records[ recordID ].jsonURL ) {

					// update all the components that were waiting for this font for an update
					records[ recordID ].component._updateFontFamily( font );

				}

			}

		} );

	}

	// keep record of the font that this component use
	if ( !records[ component.id ] ) records[ component.id ] = { component };

	records[ component.id ].jsonURL = url;

	// update the component, only if the font is already requested and loaded
	if ( fontFamilies[ url ] ) {

		component._updateFontFamily( fontFamilies[ url ] );

	}

}

/**
 * From the original json font kernings array
 * First  : Reduce the number of values by ignoring any kerning defining an amount of 0
 * Second : Update the data structure of kernings from
 * 			{Array} : [{first: 97, second: 121, amount: 0},{first: 97, second: 122, amount: -1},...]
 * 			to
 * 			{Object}: {"ij":-2,"WA":-3,...}}
 *
 * @private
 */
function _buildFriendlyKerningValues( font ) {

	// As "font registering" can comes from different paths : addFont, loadFontJSON, setFontFamily
	// Be sure we don't repeat this operation
	if ( font._kernings ) return;

	const friendlyKernings = {};

	for ( let i = 0; i < font.kernings.length; i++ ) {

		const kerning = font.kernings[ i ];

		// ignore zero kerned glyph pair
		if ( kerning.amount === 0 ) continue;

		// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
		const glyphPair = String.fromCharCode( kerning.first, kerning.second );
		friendlyKernings[ glyphPair ] = kerning.amount;

	}

	// update the font to keep it
	font._kernings = friendlyKernings;

}

/*

This method is intended for adding manually loaded fonts. Method assumes font hasn't been loaded or requested yet. If it was,
font with specified name will be overwritten, but components using it won't be updated.

*/
function addFont( name, json, texture ) {

	texture.generateMipmaps = false;
	texture.minFilter = LinearFilter;
	texture.magFilter = LinearFilter;

	requiredFontFamilies.push( name );
	fontFamilies[ name ] = json;

	// Ensure the font json is processed
	_buildFriendlyKerningValues( json );

	if ( texture ) {
		requiredFontTextures.push( name );
		fontTextures[ name ] = texture;
	}
}

//

const FontLibrary = {
	setFontFamily,
	setFontTexture,
	getFontOf,
	addFont
};

/**
 * Job:
 * - recording components required updates
 * - trigger those updates when 'update' is called
 *
 * This module is a bit special. It is, with FontLibrary, one of the only modules in the 'component'
 * directory not to be used in component composition (Object.assign).
 *
 * When MeshUIComponent is instanciated, it calls UpdateManager.register().
 *
 * Then when MeshUIComponent receives new attributes, it doesn't update the component right away.
 * Instead, it calls UpdateManager.requestUpdate(), so that the component is updated when the user
 * decides it (usually in the render loop).
 *
 * This is best for performance, because when a UI is created, thousands of componants can
 * potentially be instantiated. If they called updates function on their ancestors right away,
 * a given component could be updated thousands of times in one frame, which is very ineficient.
 *
 * Instead, redundant update request are moot, the component will update once when the use calls
 * update() in their render loop.
 */
class UpdateManager {

	/*
	 * get called by MeshUIComponent when component.set has been used.
	 * It registers this component and all its descendants for the different types of updates that were required.
	 */
	static requestUpdate( component, updateParsing, updateLayout, updateInner ) {

		component.traverse( ( child ) => {

			if ( !child.isUI ) return;

			// request updates for all descendants of the passed components
			if ( !this.requestedUpdates[ child.id ] ) {

				this.requestedUpdates[ child.id ] = {
					updateParsing,
					updateLayout,
					updateInner,
					needCallback: ( updateParsing || updateLayout || updateInner )
				};

			} else {

				if ( updateParsing ) this.requestedUpdates[ child.id ].updateParsing = true;
				if ( updateLayout ) this.requestedUpdates[ child.id ].updateLayout = true;
				if ( updateInner ) this.requestedUpdates[ child.id ].updateInner = true;

			}

		} );

	}

	/** Register a passed component for later updates */
	static register( component ) {

		if ( !this.components.includes( component ) ) {

			this.components.push( component );

		}

	}

	/** Unregister a component (when it's deleted for instance) */
	static disposeOf( component ) {

		const idx = this.components.indexOf( component );

		if ( idx > -1 ) {

			this.components.splice( idx, 1 );

		}

	}

	/** Trigger all requested updates of registered components */
	static update() {

		if ( Object.keys( this.requestedUpdates ).length > 0 ) {

			const roots = this.components.filter( ( component ) => {

				return !component.parentUI;

			} );

			roots.forEach( root => this.traverseParsing( root ) );
			roots.forEach( root => this.traverseUpdates( root ) );

		}

	}

	/**
	 * Calls parseParams update of all components from parent to children
	 * @private
	 */
	static traverseParsing( component ) {

		const request = this.requestedUpdates[ component.id ];

		if ( request && request.updateParsing ) {

			component.parseParams();

			request.updateParsing = false;

		}

		component.childrenUIs.forEach( child => this.traverseParsing( child ) );

	}

	/**
	 * Calls updateLayout and updateInner functions of components that need an update
	 * @private
	 */
	static traverseUpdates( component ) {

		const request = this.requestedUpdates[ component.id ];
		// instant remove the requested update,
		// allowing code below ( especially onAfterUpdate ) to add it without being directly remove
		delete this.requestedUpdates[ component.id ];

		//

		if ( request && request.updateLayout ) {

			request.updateLayout = false;

			component.updateLayout();

		}

		//

		if ( request && request.updateInner ) {

			request.updateInner = false;

			component.updateInner();

		}


		// Update any child
		component.childrenUIs.forEach( ( childUI ) => {

			this.traverseUpdates( childUI );

		} );

		// before sending onAfterUpdate
		if ( request && request.needCallback ) {

			component.onAfterUpdate();

		}

	}

}

// TODO move these into the class (Webpack unfortunately doesn't understand
// `static` property syntax, despite browsers already supporting this)
UpdateManager.components = [];
UpdateManager.requestedUpdates = {};

/** List the default values of the lib components */
var Defaults = {
	container: null,
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'normal', // FontKerning would act like css : "none"|"normal"|"auto"("auto" not yet implemented)
	bestFit: 'none',
	offset: 0.01,
	interLine: 0.01,
	breakOn: '- ,.:?!\n',// added '\n' to also acts as friendly breaks when white-space:normal
	whiteSpace: PRE_LINE,
	contentDirection: COLUMN,
	alignItems: CENTER$2,
	justifyContent: START,
	fontTexture: null,
	textAlign: CENTER,
	textType: 'MSDF',
	fontColor: new Color( 0xffffff ),
	fontOpacity: 1,
	fontPXRange: 4,
	fontSupersampling: true,
	borderRadius: 0.01,
	borderWidth: 0,
	borderColor: new Color( 'black' ),
	borderOpacity: 1,
	backgroundSize: "cover",
	backgroundColor: new Color( 0x222222 ),
	backgroundWhiteColor: new Color( 0xffffff ),
	backgroundOpacity: 0.8,
	backgroundOpaqueOpacity: 1.0,
	// this default value is a function to avoid initialization issues (see issue #126)
	backgroundTexture: makeBackgroundTexture,
	hiddenOverflow: false,
	letterSpacing: 0
};

//
let defaultBgTexture;

function makeBackgroundTexture() {

	if ( !defaultBgTexture ) {

		const ctx = document.createElement( 'canvas' ).getContext( '2d' );
		ctx.canvas.width = 1;
		ctx.canvas.height = 1;
		ctx.fillStyle = '#ffffff';
		ctx.fillRect( 0, 0, 1, 1 );
		defaultBgTexture = new CanvasTexture( ctx.canvas );
		defaultBgTexture.isDefault = true;

	}

	return defaultBgTexture;

}

/**

Job:
- Set this component attributes and call updates accordingly
- Getting this component attribute, from itself or from its parents
- Managing this component's states

This is the core module of three-mesh-ui. Every component is composed with it.
It owns the principal public methods of a component : set, setupState and setState.

 */
function MeshUIComponent( Base ) {

	return class MeshUIComponent extends Base {

		constructor( options ) {

			super( options );

			this.states = {};
			this.currentState = undefined;
			this.isUI = true;
			this.autoLayout = true;

			// children
			this.childrenUIs = [];
			this.childrenBoxes = [];
			this.childrenTexts = [];
			this.childrenInlines = [];

			// parents
			this.parentUI = null;
			// update parentUI when this component will be added or removed
			this.addEventListener( 'added', this._rebuildParentUI );
			this.addEventListener( 'removed', this._rebuildParentUI );
		}

		/////////////
		/// GETTERS
		/////////////

		getClippingPlanes() {

			const planes = [];

			if ( this.parentUI ) {

				if ( this.isBlock && this.parentUI.getHiddenOverflow() ) {

					const yLimit = ( this.parentUI.getHeight() / 2 ) - ( this.parentUI.padding || 0 );
					const xLimit = ( this.parentUI.getWidth() / 2 ) - ( this.parentUI.padding || 0 );

					const newPlanes = [
						new Plane( new Vector3( 0, 1, 0 ), yLimit ),
						new Plane( new Vector3( 0, -1, 0 ), yLimit ),
						new Plane( new Vector3( 1, 0, 0 ), xLimit ),
						new Plane( new Vector3( -1, 0, 0 ), xLimit )
					];

					newPlanes.forEach( plane => {

						plane.applyMatrix4( this.parent.matrixWorld );

					} );

					planes.push( ...newPlanes );

				}

				if ( this.parentUI.parentUI ) {

					planes.push( ...this.parentUI.getClippingPlanes() );

				}

			}

			return planes;

		}

		/** Get the highest parent of this component (the parent that has no parent on top of it) */
		getHighestParent() {

			if ( !this.parentUI ) {

				return this;

			}

			return this.parent.getHighestParent();


		}

		/**
		 * look for a property in this object, and if does not find it, find in parents or return default value
		 * @private
		 */
		_getProperty( propName ) {

			if ( this[ propName ] === undefined && this.parentUI ) {

				return this.parent._getProperty( propName );

			} else if ( this[ propName ] !== undefined ) {

				return this[ propName ];

			}

			return Defaults[ propName ];

		}

		//

		getFontSize() {

			return this._getProperty( 'fontSize' );

		}

		getFontKerning() {

			return this._getProperty( 'fontKerning' );

		}

		getLetterSpacing() {

			return this._getProperty( 'letterSpacing' );

		}

		getFontTexture() {

			return this._getProperty( 'fontTexture' );

		}

		getFontFamily() {

			return this._getProperty( 'fontFamily' );

		}

		getBreakOn() {

			return this._getProperty( 'breakOn' );

		}

		getWhiteSpace() {

			return this._getProperty( 'whiteSpace' );

		}

		getTextAlign() {

			return this._getProperty( 'textAlign' );

		}

		getTextType() {

			return this._getProperty( 'textType' );

		}

		getFontColor() {

			return this._getProperty( 'fontColor' );

		}


		getFontSupersampling() {

			return this._getProperty( 'fontSupersampling' );

		}

		getFontOpacity() {

			return this._getProperty( 'fontOpacity' );

		}

		getFontPXRange() {

			return this._getProperty( 'fontPXRange' );

		}

		getBorderRadius() {

			return this._getProperty( 'borderRadius' );

		}

		getBorderWidth() {

			return this._getProperty( 'borderWidth' );

		}

		getBorderColor() {

			return this._getProperty( 'borderColor' );

		}

		getBorderOpacity() {

			return this._getProperty( 'borderOpacity' );

		}

		/// SPECIALS

		/** return the first parent with a 'threeOBJ' property */
		getContainer() {

			if ( !this.threeOBJ && this.parent ) {

				return this.parent.getContainer();

			} else if ( this.threeOBJ ) {

				return this;

			}

			return Defaults.container;


		}

		/** Get the number of UI parents above this elements (0 if no parent) */
		getParentsNumber( i ) {

			i = i || 0;

			if ( this.parentUI ) {

				return this.parentUI.getParentsNumber( i + 1 );

			}

			return i;

		}

		////////////////////////////////////
		/// GETTERS WITH NO PARENTS LOOKUP
		////////////////////////////////////

		getBackgroundOpacity() {

			return ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
				Defaults.backgroundOpacity : this.backgroundOpacity;

		}

		getBackgroundColor() {

			return this.backgroundColor || Defaults.backgroundColor;

		}

		getBackgroundTexture() {

			return this.backgroundTexture || Defaults.backgroundTexture();

		}

		/**
		 * @deprecated
		 * @returns {string}
		 */
		getAlignContent() {

			return this.alignContent || Defaults.alignContent;

		}

		getAlignItems() {

			return this.alignItems || Defaults.alignItems;

		}

		getContentDirection() {

			return this.contentDirection || Defaults.contentDirection;

		}

		getJustifyContent() {

			return this.justifyContent || Defaults.justifyContent;

		}

		getInterLine() {

			return ( this.interLine === undefined ) ? Defaults.interLine : this.interLine;

		}

		getOffset() {

			return ( this.offset === undefined ) ? Defaults.offset : this.offset;

		}

		getBackgroundSize() {

			return ( this.backgroundSize === undefined ) ? Defaults.backgroundSize : this.backgroundSize;

		}

		getHiddenOverflow() {

			return ( this.hiddenOverflow === undefined ) ? Defaults.hiddenOverflow : this.hiddenOverflow;

		}

		getBestFit() {

			return ( this.bestFit === undefined ) ? Defaults.bestFit : this.bestFit;

		}

		///////////////
		///  UPDATE
		///////////////

		/**
		 * Filters children in order to compute only one times children lists
		 * @private
		 */
		_rebuildChildrenLists() {

			// Stores all children that are ui
			this.childrenUIs = this.children.filter( child => child.isUI );

			// Stores all children that are box
			this.childrenBoxes = this.children.filter( child => child.isBoxComponent );

			// Stores all children that are inline
			this.childrenInlines = this.children.filter( child => child.isInline );

			// Stores all children that are text
			this.childrenTexts = this.children.filter( child => child.isText );
		}

		/**
		 * Try to retrieve parentUI after each structural change
		 * @private
		 */
		_rebuildParentUI = ( ) => {

			if ( this.parent && this.parent.isUI ) {

				this.parentUI = this.parent;

			} else {

				this.parentUI = null;

			}

		};

		/**
		 * When the user calls component.add, it registers for updates,
		 * then call THREE.Object3D.add.
		 */
		add() {

			for ( const id of Object.keys( arguments ) ) {

				// An inline component relies on its parent for positioning
				if ( arguments[ id ].isInline ) this.update( null, true );

			}

			const result = super.add( ...arguments );

			this._rebuildChildrenLists();

			return result;

		}

		/**
		 * When the user calls component.remove, it registers for updates,
		 * then call THREE.Object3D.remove.
		 */
		remove() {

			for ( const id of Object.keys( arguments ) ) {

				// An inline component relies on its parent for positioning
				if ( arguments[ id ].isInline ) this.update( null, true );

			}

			const result = super.remove( ...arguments );

			this._rebuildChildrenLists();

			return result;

		}

		//

		update( updateParsing, updateLayout, updateInner ) {

			UpdateManager.requestUpdate( this, updateParsing, updateLayout, updateInner );

		}

		onAfterUpdate() {

		}

		/**
		 * Called by FontLibrary when the font requested for the current component is ready.
		 * Trigger an update for the component whose font is now available.
		 * @private - "package protected"
		 */
		_updateFontFamily( font ) {

			this.fontFamily = font;

			this.traverse( ( child ) => {

				if ( child.isUI ) child.update( true, true, false );

			} );

			this.getHighestParent().update( false, true, false );

		}

		/** @private - "package protected" */
		_updateFontTexture( texture ) {

			this.fontTexture = texture;

			this.getHighestParent().update( false, true, false );

		}

		/**
		 * Set this component's passed parameters.
		 * If necessary, take special actions.
		 * Update this component unless otherwise specified.
		 */
		set( options ) {

			let parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate;

			// Register to the update manager, so that it knows when to update

			UpdateManager.register( this );

			// Abort if no option passed

			if ( !options || JSON.stringify( options ) === JSON.stringify( {} ) ) return;

			// DEPRECATION Warnings until -------------------------------------- 7.x.x ---------------------------------------

			// Align content has been removed
			if( options["alignContent"] ){

				options["alignItems"] = options["alignContent"];

				if( !options["textAlign"] ){

					options["textAlign"] = options["alignContent"];

				}

				console.warn("`alignContent` property has been deprecated, please rely on `alignItems` and `textAlign` instead.");

				delete options["alignContent"];

			}

			// Align items left top bottom right will be removed
			if( options['alignItems'] ){

				warnAboutDeprecatedAlignItems( options['alignItems'] );

			}


			// Set this component parameters according to options, and trigger updates accordingly
			// The benefit of having two types of updates, is to put everthing that takes time
			// in one batch, and the rest in the other. This way, efficient animation is possible with
			// attribute from the light batch.

			for ( const prop of Object.keys( options ) ) {

				if ( this[ prop ] != options[ prop ] ) {

					switch ( prop ) {

						case 'content' :
						case 'fontSize' :
						case 'fontKerning' :
						case 'breakOn':
						case 'whiteSpace':
							if ( this.isText ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'bestFit' :
							if ( this.isBlock ) {
								parsingNeedsUpdate = true;
								layoutNeedsUpdate = true;
							}
							this[ prop ] = options[ prop ];
							break;

						case 'width' :
						case 'height' :
						case 'padding' :
							if ( this.isInlineBlock || ( this.isBlock && this.getBestFit() != 'none' ) ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'letterSpacing' :
						case 'interLine' :
							if ( this.isBlock && this.getBestFit() != 'none' ) parsingNeedsUpdate = true;
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'margin' :
						case 'contentDirection' :
						case 'justifyContent' :
						case 'alignContent' :
						case 'alignItems' :
						case 'textAlign' :
						case 'textType' :
							layoutNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'fontColor' :
						case 'fontOpacity' :
						case 'fontSupersampling' :
						case 'offset' :
						case 'backgroundColor' :
						case 'backgroundOpacity' :
						case 'backgroundTexture' :
						case 'backgroundSize' :
						case 'borderRadius' :
						case 'borderWidth' :
						case 'borderColor' :
						case 'borderOpacity' :
							innerNeedsUpdate = true;
							this[ prop ] = options[ prop ];
							break;

						case 'hiddenOverflow' :
							this[ prop ] = options[ prop ];
							break;

					}

				}

			}

			// special cases, this.update() must be called only when some files finished loading

			if ( options.fontFamily ) {

				FontLibrary.setFontFamily( this, options.fontFamily );

			}

			if ( options.fontTexture ) {

				FontLibrary.setFontTexture( this, options.fontTexture );

			}

			// if font kerning changes for a child of a block with Best Fit enabled, we need to trigger parsing for the parent as well.
			if ( this.parentUI && this.parentUI.getBestFit() != 'none' ) this.parentUI.update( true, true, false );

			// Call component update

			this.update( parsingNeedsUpdate, layoutNeedsUpdate, innerNeedsUpdate );


			if ( layoutNeedsUpdate ) this.getHighestParent().update( false, true, false );

		}

		/////////////////////
		// STATES MANAGEMENT
		/////////////////////

		/** Store a new state in this component, with linked attributes */
		setupState( options ) {

			this.states[ options.state ] = {
				attributes: options.attributes,
				onSet: options.onSet
			};

		}

		/** Set the attributes of a stored state of this component */
		setState( state ) {

			const savedState = this.states[ state ];

			if ( !savedState ) {
				console.warn( `state "${state}" does not exist within this component:`, this.name );
				return;
			}

			if ( state === this.currentState ) return;

			this.currentState = state;

			if ( savedState.onSet ) savedState.onSet();

			if ( savedState.attributes ) this.set( savedState.attributes );

		}

		/** Get completely rid of this component and its children, also unregister it for updates */
		clear() {

			this.traverse( ( obj ) => {

				UpdateManager.disposeOf( obj );

				if ( obj.material ) obj.material.dispose();

				if ( obj.geometry ) obj.geometry.dispose();

			} );

		}
	};

}

/* eslint-disable camelcase */

/**

Job:
- Host the materials of a given component.
- Update a component's materials clipping planes.
- Update a material uniforms and such.

Knows:
- Its component materials.
- Its component ancestors clipping planes.

 */
function MaterialManager( Base ) {

	return class MaterialManager extends Base {

		constructor( options ) {

			super( options );

			this.textUniforms = {
				u_texture: { value: null },
				u_color: { value: null },
				u_opacity: { value: null },
				u_pxRange: { value: null },
				u_useRGSS: { value: null },
			};

			this.backgroundUniforms = {
				u_texture: { value: null },
				u_color: { value: null },
				u_opacity: { value: null },
				u_backgroundMapping: { value: null },
				u_borderWidth: { value: null },
				u_borderColor: { value: null },
				u_borderRadiusTopLeft: { value: null },
				u_borderRadiusTopRight: { value: null },
				u_borderRadiusBottomRight: { value: null },
				u_borderRadiusBottomLeft: { value: null },
				u_borderOpacity: { value: null },
				u_size: { value: new Vector2( 1, 1 ) },
				u_tSize: { value: new Vector2( 1, 1 ) }
			};

		}

		/**
		 * Update backgroundMaterial uniforms.
		 * Used within MaterialManager and in Block and InlineBlock innerUpdates.
		 */
		updateBackgroundMaterial() {

			this.backgroundUniforms.u_texture.value = this.getBackgroundTexture();

			this.backgroundUniforms.u_tSize.value.set(
				this.backgroundUniforms.u_texture.value.image.width,
				this.backgroundUniforms.u_texture.value.image.height
			);

			if ( this.size ) this.backgroundUniforms.u_size.value.copy( this.size );

			if ( this.backgroundUniforms.u_texture.value.isDefault ) {

				this.backgroundUniforms.u_color.value = this.getBackgroundColor();

				this.backgroundUniforms.u_opacity.value = this.getBackgroundOpacity();

			} else {

				this.backgroundUniforms.u_color.value = this.backgroundColor || Defaults.backgroundWhiteColor;

				this.backgroundUniforms.u_opacity.value = ( !this.backgroundOpacity && this.backgroundOpacity !== 0 ) ?
					Defaults.backgroundOpaqueOpacity :
					this.backgroundOpacity;

			}

			this.backgroundUniforms.u_backgroundMapping.value = ( () => {

				switch ( this.getBackgroundSize() ) {

					case 'stretch':
						return 0;
					case 'contain':
						return 1;
					case 'cover':
						return 2;

				}

			} )();

			const borderRadius = this.getBorderRadius();
			this.backgroundUniforms.u_borderWidth.value = this.getBorderWidth();
			this.backgroundUniforms.u_borderColor.value = this.getBorderColor();
			this.backgroundUniforms.u_borderOpacity.value = this.getBorderOpacity();

			//

			if ( Array.isArray( borderRadius ) ) {

				this.backgroundUniforms.u_borderRadiusTopLeft.value = borderRadius[ 0 ];
				this.backgroundUniforms.u_borderRadiusTopRight.value = borderRadius[ 1 ];
				this.backgroundUniforms.u_borderRadiusBottomRight.value = borderRadius[ 2 ];
				this.backgroundUniforms.u_borderRadiusBottomLeft.value = borderRadius[ 3 ];

			} else {

				this.backgroundUniforms.u_borderRadiusTopLeft.value = borderRadius;
				this.backgroundUniforms.u_borderRadiusTopRight.value = borderRadius;
				this.backgroundUniforms.u_borderRadiusBottomRight.value = borderRadius;
				this.backgroundUniforms.u_borderRadiusBottomLeft.value = borderRadius;

			}

		}

		/**
		 * Update backgroundMaterial uniforms.
		 * Used within MaterialManager and in Text innerUpdates.
		 */
		updateTextMaterial() {

			this.textUniforms.u_texture.value = this.getFontTexture();
			this.textUniforms.u_color.value = this.getFontColor();
			this.textUniforms.u_opacity.value = this.getFontOpacity();
			this.textUniforms.u_pxRange.value = this.getFontPXRange();
			this.textUniforms.u_useRGSS.value = this.getFontSupersampling();

		}

		/** Called by Block, which needs the background material to create a mesh */
		getBackgroundMaterial() {

			if ( !this.backgroundMaterial || !this.backgroundUniforms ) {

				this.backgroundMaterial = this._makeBackgroundMaterial();

			}

			return this.backgroundMaterial;

		}

		/** Called by Text to get the font material */
		getFontMaterial() {

			if ( !this.fontMaterial || !this.textUniforms ) {

				this.fontMaterial = this._makeTextMaterial();

			}

			return this.fontMaterial;

		}

		/** @private */
		_makeTextMaterial() {

			return new ShaderMaterial( {
				uniforms: this.textUniforms,
				transparent: true,
				clipping: true,
				vertexShader: textVertex,
				fragmentShader: textFragment,
				extensions: {
					derivatives: true
				}
			} );

		}

		/** @private */
		_makeBackgroundMaterial() {

			return new ShaderMaterial( {
				uniforms: this.backgroundUniforms,
				transparent: true,
				clipping: true,
				vertexShader: backgroundVertex,
				fragmentShader: backgroundFragment,
				extensions: {
					derivatives: true
				}
			} );

		}

		/**
		 * Update a component's materials clipping planes.
		 * Called every frame.
		 */
		updateClippingPlanes( value ) {

			const newClippingPlanes = value !== undefined ? value : this.getClippingPlanes();

			if ( JSON.stringify( newClippingPlanes ) !== JSON.stringify( this.clippingPlanes ) ) {

				this.clippingPlanes = newClippingPlanes;

				if ( this.fontMaterial ) this.fontMaterial.clippingPlanes = this.clippingPlanes;

				if ( this.backgroundMaterial ) this.backgroundMaterial.clippingPlanes = this.clippingPlanes;

			}

		}

	};

}

////////////////
// Text shaders
////////////////

const textVertex = `
varying vec2 vUv;

#include <clipping_planes_pars_vertex>

void main() {

	vUv = uv;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	gl_Position.z -= 0.00001;

	#include <clipping_planes_vertex>

}
`;

//

const textFragment = `

uniform sampler2D u_texture;
uniform vec3 u_color;
uniform float u_opacity;
uniform float u_pxRange;
uniform bool u_useRGSS;

varying vec2 vUv;

#include <clipping_planes_pars_fragment>

// functions from the original msdf repo:
// https://github.com/Chlumsky/msdfgen#using-a-multi-channel-distance-field

float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}

float screenPxRange() {
	vec2 unitRange = vec2(u_pxRange)/vec2(textureSize(u_texture, 0));
	vec2 screenTexSize = vec2(1.0)/fwidth(vUv);
	return max(0.5*dot(unitRange, screenTexSize), 1.0);
}

float tap(vec2 offsetUV) {
	vec3 msd = texture( u_texture, offsetUV ).rgb;
	float sd = median(msd.r, msd.g, msd.b);
	float screenPxDistance = screenPxRange() * (sd - 0.5);
	float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
	return alpha;
}

void main() {

	float alpha;

	if ( u_useRGSS ) {

		// shader-based supersampling based on https://bgolus.medium.com/sharper-mipmapping-using-shader-based-supersampling-ed7aadb47bec
		// per pixel partial derivatives
		vec2 dx = dFdx(vUv);
		vec2 dy = dFdy(vUv);

		// rotated grid uv offsets
		vec2 uvOffsets = vec2(0.125, 0.375);
		vec2 offsetUV = vec2(0.0, 0.0);

		// supersampled using 2x2 rotated grid
		alpha = 0.0;
		offsetUV.xy = vUv + uvOffsets.x * dx + uvOffsets.y * dy;
		alpha += tap(offsetUV);
		offsetUV.xy = vUv - uvOffsets.x * dx - uvOffsets.y * dy;
		alpha += tap(offsetUV);
		offsetUV.xy = vUv + uvOffsets.y * dx - uvOffsets.x * dy;
		alpha += tap(offsetUV);
		offsetUV.xy = vUv - uvOffsets.y * dx + uvOffsets.x * dy;
		alpha += tap(offsetUV);
		alpha *= 0.25;

	} else {

		alpha = tap( vUv );

	}


	// apply the opacity
	alpha *= u_opacity;

	// this is useful to avoid z-fighting when quads overlap because of kerning
	if ( alpha < 0.02) discard;


	gl_FragColor = vec4( u_color, alpha );

	#include <clipping_planes_fragment>

}
`;

//////////////////////
// Background shaders
//////////////////////

const backgroundVertex = `
varying vec2 vUv;

#include <clipping_planes_pars_vertex>

void main() {

	vUv = uv;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

	#include <clipping_planes_vertex>

}
`;

//

const backgroundFragment = `

uniform sampler2D u_texture;
uniform vec3 u_color;
uniform float u_opacity;

uniform float u_borderRadiusTopLeft;
uniform float u_borderRadiusTopRight;
uniform float u_borderRadiusBottomLeft;
uniform float u_borderRadiusBottomRight;
uniform float u_borderWidth;
uniform vec3 u_borderColor;
uniform float u_borderOpacity;
uniform vec2 u_size;
uniform vec2 u_tSize;
uniform int u_backgroundMapping;

varying vec2 vUv;

#include <clipping_planes_pars_fragment>

float getEdgeDist() {
	vec2 ndc = vec2( vUv.x * 2.0 - 1.0, vUv.y * 2.0 - 1.0 );
	vec2 planeSpaceCoord = vec2( u_size.x * 0.5 * ndc.x, u_size.y * 0.5 * ndc.y );
	vec2 corner = u_size * 0.5;
	vec2 offsetCorner = corner - abs( planeSpaceCoord );
	float innerRadDist = min( offsetCorner.x, offsetCorner.y ) * -1.0;
	if (vUv.x < 0.5 && vUv.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopLeft, 0.0 ) ) - u_borderRadiusTopLeft;
		float s = step( innerRadDist * -1.0, u_borderRadiusTopLeft );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUv.x >= 0.5 && vUv.y >= 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusTopRight, 0.0 ) ) - u_borderRadiusTopRight;
		float s = step( innerRadDist * -1.0, u_borderRadiusTopRight );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUv.x >= 0.5 && vUv.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomRight, 0.0 ) ) - u_borderRadiusBottomRight;
		float s = step( innerRadDist * -1.0, u_borderRadiusBottomRight );
		return mix( innerRadDist, roundedDist, s );
	}
	if (vUv.x < 0.5 && vUv.y < 0.5) {
		float roundedDist = length( max( abs( planeSpaceCoord ) - u_size * 0.5 + u_borderRadiusBottomLeft, 0.0 ) ) - u_borderRadiusBottomLeft;
		float s = step( innerRadDist * -1.0, u_borderRadiusBottomLeft );
		return mix( innerRadDist, roundedDist, s );
	}
}

vec4 sampleTexture() {
	float textureRatio = u_tSize.x / u_tSize.y;
	float panelRatio = u_size.x / u_size.y;
	vec2 uv = vUv;
	if ( u_backgroundMapping == 1 ) { // contain
		if ( textureRatio < panelRatio ) { // repeat on X
			float newX = uv.x * ( panelRatio / textureRatio );
			newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
			uv.x = newX;
		} else { // repeat on Y
			float newY = uv.y * ( textureRatio / panelRatio );
			newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
			uv.y = newY;
		}
	} else if ( u_backgroundMapping == 2 ) { // cover
		if ( textureRatio < panelRatio ) { // stretch on Y
			float newY = uv.y * ( textureRatio / panelRatio );
			newY += 0.5 - 0.5 * ( textureRatio / panelRatio );
			uv.y = newY;
		} else { // stretch on X
			float newX = uv.x * ( panelRatio / textureRatio );
			newX += 0.5 - 0.5 * ( panelRatio / textureRatio );
			uv.x = newX;
		}
	}
	return texture2D( u_texture, uv ).rgba;
}

void main() {

	float edgeDist = getEdgeDist();
	float change = fwidth( edgeDist );

	vec4 textureSample = sampleTexture();
	vec3 blendedColor = textureSample.rgb * u_color;

	float alpha = smoothstep( change, 0.0, edgeDist );
	float blendedOpacity = u_opacity * textureSample.a * alpha;

	vec4 frameColor = vec4( blendedColor, blendedOpacity );

	if ( u_borderWidth <= 0.0 ) {
		gl_FragColor = frameColor;
	} else {
		vec4 borderColor = vec4( u_borderColor, u_borderOpacity * alpha );
		float stp = smoothstep( edgeDist + change, edgeDist, u_borderWidth * -1.0 );
		gl_FragColor = mix( frameColor, borderColor, stp );
	}

	#include <clipping_planes_fragment>
}
`;

/**
 * Returns a basic plane mesh.
 */
class Frame extends Mesh {

	constructor( material ) {

		const geometry = new PlaneGeometry();

		super( geometry, material );

		this.castShadow = true;
		this.receiveShadow = true;

		this.name = 'MeshUI-Frame';

	}

}

let _Base = null;

/**
 * A function for applying multiple mixins more tersely (less verbose)
 * @param {Function[]} mixins - All args to this function should be mixins that take a class and return a class.
 */
function mix( ...mixins ) {

	// console.log('initial Base: ', _Base);

	if( !_Base ){
		throw new Error("Cannot use mixins with Base null");
	}

	let Base = _Base;

	_Base = null;

	let i = mixins.length;
	let mixin;

	while ( --i >= 0 ) {

		mixin = mixins[ i ];
		Base = mixin( Base );

	}

	return Base;

}

mix.withBase = ( Base ) => {

	_Base = Base;

	return mix;

};

/**

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes

 */
class Block extends mix.withBase( Object3D )(
	BoxComponent,
	InlineManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isBlock = true;

		//

		this.size = new Vector2( 1, 1 );

		this.frame = new Frame( this.getBackgroundMaterial() );

		// This is for hiddenOverflow to work
		this.frame.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this.frame );

		// Lastly set the options parameters to this object, which will trigger an update

		this.set( options );

	}

	////////////
	//  UPDATE
	////////////

	parseParams() {

		const bestFit = this.getBestFit();

		if ( bestFit != 'none' && this.childrenTexts.length ) {

			this.calculateBestFit( bestFit );

		} else {

			this.childrenTexts.forEach( child => {

				child._fitFontSize = undefined;

			} );
		}
	}

	updateLayout() {

		// Get temporary dimension

		const WIDTH = this.getWidth();

		const HEIGHT = this.getHeight();

		if ( !WIDTH || !HEIGHT ) {

			console.warn( 'Block got no dimension from its parameters or from children parameters' );
			return;

		}

		this.size.set( WIDTH, HEIGHT );
		this.frame.scale.set( WIDTH, HEIGHT, 1 );

		if ( this.frame ) this.updateBackgroundMaterial();

		this.frame.renderOrder = this.getParentsNumber();

		// Position this element according to earlier parent computation.
		// Delegate to BoxComponent.

		if ( this.autoLayout ) {

			this.setPosFromParentRecords();

		}

		// Position inner elements according to dimensions and layout parameters.
		// Delegate to BoxComponent.

		if ( this.childrenInlines.length ) {

			this.computeInlinesPosition();

		}

		this.computeChildrenPosition();

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.parentUI ) {

			this.position.z = this.getOffset();

		}

	}

	//

	updateInner() {

		// We check if this block is the root component,
		// because most of the time the user wants to set the
		// root component's z position themselves
		if ( this.parentUI ) {

			this.position.z = this.getOffset();

		}

		if ( this.frame ) this.updateBackgroundMaterial();

	}

}

/**

Job: nothing yet, but adding a isInline parameter to an inline component

Knows: parent dimensions

 */
function InlineComponent( Base ) {

	return class InlineComponent extends Base {

		constructor( options ) {

			super( options );

			this.isInline = true;

		}

	};
}

/**
 * @param  {Array<BufferGeometry>} geometries
 * @param  {Boolean} useGroups
 * @return {BufferGeometry}
 */
function mergeBufferGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		// gather .userData

		mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
		mergedGeometry.userData.mergedUserData.push( geometry.userData );

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeBufferAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeBufferAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {BufferAttribute}
 */
function mergeBufferAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( attribute.isInterleavedBufferAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported.' );
			return null;

		}

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.array.length;

	}

	const array = new TypedArray( arrayLength );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		array.set( attributes[ i ].array, offset );

		offset += attributes[ i ].array.length;

	}

	return new BufferAttribute( array, itemSize, normalized );

}

/**
 * Job: create a plane geometry with the right UVs to map the MSDF texture on the wanted glyph.
 *
 * Knows: dimension of the plane to create, specs of the font used, glyph requireed
 */
class MSDFGlyph extends PlaneGeometry {

	constructor( inline, font ) {

		const char = inline.glyph;
		const fontSize = inline.fontSize;

		super( fontSize, fontSize );

		// Misc glyphs
		if ( char.match( /\s/g ) === null ) {

			if ( font.info.charset.indexOf( char ) === -1 ) console.error( `The character '${char}' is not included in the font characters set.` );

			this.mapUVs( font, char );

			this.transformGeometry( font, fontSize, char, inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this.nullifyUVs();

			this.scale( 0, 0, 1 );
			this.translate( 0, fontSize / 2, 0 );

		}

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @private
	 */
	mapUVs( font, char ) {

		const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

		const common = font.common;

		const xMin = charOBJ.x / common.scaleW;

		const xMax = ( charOBJ.x + charOBJ.width ) / common.scaleW;

		const yMin = 1 - ( ( charOBJ.y + charOBJ.height ) / common.scaleH );

		const yMax = 1 - ( charOBJ.y / common.scaleH );

		//

		const uvAttribute = this.attributes.uv;

		for ( let i = 0; i < uvAttribute.count; i++ ) {

			let u = uvAttribute.getX( i );
			let v = uvAttribute.getY( i );

			[ u, v ] = ( () => {

				switch ( i ) {

					case 0 :
						return [ xMin, yMax ];
					case 1 :
						return [ xMax, yMax ];
					case 2 :
						return [ xMin, yMin ];
					case 3 :
						return [ xMax, yMin ];

				}

			} )();

			uvAttribute.setXY( i, u, v );

		}

	}

	/** Set all UVs to 0, so that none of the glyphs on the texture will appear */
	nullifyUVs() {

		const uvAttribute = this.attributes.uv;

		for ( let i = 0; i < uvAttribute.count; i++ ) {

			uvAttribute.setXY( i, 0, 0 );

		}

	}

	/** Gives the previously computed scale and offset to the geometry */
	transformGeometry( font, fontSize, char, inline ) {

		const charOBJ = font.chars.find( charOBJ => charOBJ.char === char );

		const common = font.common;

		const newHeight = charOBJ.height / common.lineHeight;
		const newWidth = ( charOBJ.width * newHeight ) / charOBJ.height;

		this.scale(
			newWidth,
			newHeight,
			1
		);

		//

		this.translate(
			inline.width / 2,
			( inline.height / 2 ) - inline.anchor,
			0
		);

	}

}

/**

Job:
- Computing glyphs dimensions according to this component's font and content
- Create the text Mesh (call MSDFGlyph for each letter)

Knows:
- The Text component for which it creates Meshes
- The parameters of the text mesh it must return

 */

function getGlyphDimensions( options ) {

	const FONT = options.font;

	const FONT_SIZE = options.fontSize;

	const GLYPH = options.glyph;

	const SCALE_MULT = FONT_SIZE / FONT.info.size;

	//

	const charOBJ = FONT.chars.find( charOBJ => charOBJ.char === GLYPH );

	let width = charOBJ ? charOBJ.width * SCALE_MULT : FONT_SIZE / 3;

	let height = charOBJ ? charOBJ.height * SCALE_MULT : 0;

	// handle exported whitespaces
	if ( width === 0 ) {

		// if this whitespaces in is the charset, use its xadvance value
		// or fallback to fontSize
		width = charOBJ ? charOBJ.xadvance * SCALE_MULT : FONT_SIZE;

	}


	if ( height === 0 ) height = FONT_SIZE * 0.7;

	if ( GLYPH === '\n' ) width = 0;

	const xadvance = charOBJ ? charOBJ.xadvance * SCALE_MULT : width;
	const xoffset = charOBJ ? charOBJ.xoffset * SCALE_MULT : 0;

	// world-space length between lowest point and the text cursor position
	const anchor = charOBJ ? ( ( charOBJ.yoffset + charOBJ.height - FONT.common.base ) * FONT_SIZE ) / FONT.common.lineHeight : 0;

	// const lineHeight = FONT.common.lineHeight * SCALE_MULT;

	// console.log( lineHeight )

	return {
		// lineHeight,
		width,
		height,
		anchor,
		xadvance,
		xoffset
	};

}


/**
 * Try to find the kerning amount of a
 * @param font
 * @param {string} glyphPair
 * @returns {number}
 */
function getGlyphPairKerning( font, glyphPair ) {

	const KERNINGS = font._kernings;
	return KERNINGS[ glyphPair ] ? KERNINGS[ glyphPair ] : 0;

}


//

/**
 * Creates a THREE.Plane geometry, with UVs carefully positioned to map a particular
 * glyph on the MSDF texture. Then creates a shaderMaterial with the MSDF shaders,
 * creates a THREE.Mesh, returns it.
 * @private
 */
function buildText() {

	const translatedGeom = [];

	this.inlines.forEach( ( inline, i ) => {

		translatedGeom[ i ] = new MSDFGlyph( inline, this.getFontFamily() );

		translatedGeom[ i ].translate( inline.offsetX, inline.offsetY, 0 );

	} );

	const mergedGeom = mergeBufferGeometries( translatedGeom );

	const mesh = new Mesh( mergedGeom, this.getFontMaterial() );

	return mesh;

}

//

var MSDFText = {
	getGlyphDimensions,
	getGlyphPairKerning,
	buildText
};

/**

Job:
- Routing the request for Text dimensions and Text creation depending on Text type.

Knows:
- this component's textType attribute

Note:
Only one Text type is natively supported by the library at the moment,
but the architecture allows you to easily stick in your custom Text type.
More information here :
https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type

 */
function TextManager( Base ) {

	return class TextManager extends Base {

		createText() {

			const component = this;

			const mesh = ( () => {

				switch ( this.getTextType() ) {

					case 'MSDF' :
						return MSDFText.buildText.call( this );

					default :
						console.warn( `'${this.getTextType()}' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
						break;

				}

			} )();

			mesh.renderOrder = Infinity;

			// This is for hiddenOverflow to work
			mesh.onBeforeRender = function () {

				if ( component.updateClippingPlanes ) {

					component.updateClippingPlanes();

				}

			};

			return mesh;

		}

		/**
		 * Called by Text to get the dimensions of a particular glyph,
		 * in order for InlineManager to compute its position
		 */
		getGlyphDimensions( options ) {

			switch ( options.textType ) {

				case 'MSDF' :

					return MSDFText.getGlyphDimensions( options );

				default :
					console.warn( `'${options.textType}' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
					break;

			}

		}


		/**
		 * Called by Text to get the amount of kerning for pair of glyph
		 * @param textType
		 * @param font
		 * @param glyphPair
		 * @returns {number}
		 */
		getGlyphPairKerning( textType, font, glyphPair ) {

			switch ( textType ) {

				case 'MSDF' :

					return MSDFText.getGlyphPairKerning( font, glyphPair );

				default :
					console.warn( `'${textType}' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
					break;

			}

		}
	};

}

/** Recursively erase THE CHILDREN of the passed object */
function deepDelete( object3D ) {

	object3D.children.forEach( ( child ) => {

		if ( child.children.length > 0 ) deepDelete( child );

		object3D.remove( child );

		UpdateManager.disposeOf( child );

		if ( child.material ) child.material.dispose();

		if ( child.geometry ) child.geometry.dispose();

	} );

	object3D.children = [];

}

/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block

 */
class Text extends mix.withBase( Object3D )(
	InlineComponent,
	TextManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isText = true;

		this.set( options );

	}

	///////////
	// UPDATES
	///////////


	/**
	 * Here we compute each glyph dimension, and we store it in this
	 * component's inlines parameter. This way the parent Block will
	 * compute each glyph position on updateLayout.
	 */
	parseParams() {

		this.calculateInlines( this._fitFontSize || this.getFontSize() );

	}

	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 */
	updateLayout() {

		deepDelete( this );

		if ( this.inlines ) {

			// happening in TextManager
			this.textContent = this.createText();

			this.updateTextMaterial();

			this.add( this.textContent );

		}

		this.position.z = this.getOffset();

	}

	updateInner() {

		this.position.z = this.getOffset();

		if ( this.textContent ) this.updateTextMaterial();

	}

	calculateInlines( fontSize ) {

		const content = this.content;
		const font = this.getFontFamily();
		const breakChars = this.getBreakOn();
		const textType = this.getTextType();
		const whiteSpace = this.getWhiteSpace();

		// Abort condition

		if ( !font || typeof font === 'string' ) {

			if ( !FontLibrary.getFontOf( this ) ) console.warn( 'no font was found' );
			return;

		}

		if ( !this.content ) {

			this.inlines = null;
			return;

		}

		if ( !textType ) {

			console.error( `You must provide a 'textType' attribute so three-mesh-ui knows how to render your text.\n See https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type` );
			return;

		}

		// collapse whitespace for white-space normal
		const whitespaceProcessedContent = collapseWhitespaceOnString( content, whiteSpace );
		const chars = Array.from ? Array.from( whitespaceProcessedContent ) : String( whitespaceProcessedContent ).split( '' );


		// Compute glyphs sizes

		const SCALE_MULT = fontSize / font.info.size;
		const lineHeight = font.common.lineHeight * SCALE_MULT;
		const lineBase = font.common.base * SCALE_MULT;

		const glyphInfos = chars.map( ( glyph ) => {

			// Get height, width, and anchor point of this glyph
			const dimensions = this.getGlyphDimensions( {
				textType,
				glyph,
				font,
				fontSize
			} );

			//

			let lineBreak = null;

			if( whiteSpace !== NOWRAP ) {

				if ( breakChars.includes( glyph ) || glyph.match( /\s/g ) ) lineBreak = 'possible';

			}


			if ( glyph.match( /\n/g ) ) {

				lineBreak = newlineBreakability( whiteSpace );

			}

			//

			return {
				height: dimensions.height,
				width: dimensions.width,
				anchor: dimensions.anchor,
				xadvance: dimensions.xadvance,
				xoffset: dimensions.xoffset,
				lineBreak,
				glyph,
				fontSize,
				lineHeight,
				lineBase
			};

		} );

		// apply kerning
		if ( this.getFontKerning() !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			for ( let i = 1; i < glyphInfos.length; i++ ) {

				const glyphInfo = glyphInfos[ i ];
				const glyphPair = glyphInfos[ i - 1 ].glyph + glyphInfos[ i ].glyph;

				// retrieve the kerning from the font
				const kerning = this.getGlyphPairKerning( textType, font, glyphPair );

				// compute the final kerning value according to requested fontSize
				glyphInfo[ 'kerning' ] = kerning * ( fontSize / font.info.size );

			}
		}


		// Update 'inlines' property, so that the parent can compute each glyph position

		this.inlines = glyphInfos;
	}

}

/**
 * Job:
 * - computing its own size according to user measurements or content measurement
 * - creating an 'inlines' object with info, so that the parent component can organise it along with other inlines
 *
 * Knows:
 * - Its measurements parameter
 * - Parent block
 */
class InlineBlock extends mix.withBase( Object3D )(
	InlineComponent,
	BoxComponent,
	InlineManager,
	MaterialManager,
	MeshUIComponent
) {

	constructor( options ) {

		super( options );

		this.isInlineBlock = true;

		//

		this.size = new Vector2( 1, 1 );

		this.frame = new Frame( this.getBackgroundMaterial() );

		// This is for hiddenOverflow to work
		this.frame.onBeforeRender = () => {

			if ( this.updateClippingPlanes ) {

				this.updateClippingPlanes();

			}

		};

		this.add( this.frame );

		// Lastly set the options parameters to this object, which will trigger an update

		this.set( options );

	}

	///////////
	// UPDATES
	///////////

	parseParams() {

		// Get image dimensions

		if ( !this.width ) console.warn( 'inlineBlock has no width. Set to 0.3 by default' );
		if ( !this.height ) console.warn( 'inlineBlock has no height. Set to 0.3 by default' );

		this.inlines = [ {
			height: this.height || 0.3,
			width: this.width || 0.3,
			anchor: 0,
			lineBreak: 'possible'
		} ];

	}

	//


	/**
	 * Create text content
	 *
	 * At this point, text.inlines should have been modified by the parent
	 * component, to add xOffset and yOffset properties to each inlines.
	 * This way, TextContent knows were to position each character.
	 *
	 */
	updateLayout() {

		const WIDTH = this.getWidth();
		const HEIGHT = this.getHeight();

		if ( this.inlines ) {

			const options = this.inlines[ 0 ];

			// basic translation to put the plane's left bottom corner at the center of its space
			this.position.set( options.width / 2, options.height / 2, 0 );

			// translation required by inlineManager to position this component inline
			this.position.x += options.offsetX;
			this.position.y += options.offsetY;

		}

		this.size.set( WIDTH, HEIGHT );
		this.frame.scale.set( WIDTH, HEIGHT, 1 );

		if ( this.frame ) this.updateBackgroundMaterial();

		this.frame.renderOrder = this.getParentsNumber();

		// Position inner elements according to dimensions and layout parameters.
		// Delegate to BoxComponent.

		if ( this.childrenInlines.length ) {

			this.computeInlinesPosition();

		}

		this.computeChildrenPosition();

		this.position.z = this.getOffset();

	}

	//

	updateInner() {

		this.position.z = this.getOffset();

		if ( this.frame ) this.updateBackgroundMaterial();

	}

}

/**

Contains key maps for the Keyboard component.
Most languages need a specific keyboard. Therefore, Keyboard takes a language attribute
and if not passed tries to detect the language. If not found, it uses the basic QZERTY layout.

 */
var keymaps = {

	fr:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'm', upperCase: 'M' } ] }
				],

				[
					{ width: 0.2, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]

			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	///////////////////////////////////////////////////////////

	eng:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'l', upperCase: 'L' } ] }
				],

				[
					{ width: 0.15, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 0.15, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]

			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	////////////////////////////////////////////////////////////

	ru:
		[
			[
				[
					{ width: 1 / 12, chars: [ { lowerCase: 'й', upperCase: 'Й' }, { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ц', upperCase: 'Ц' }, { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'у', upperCase: 'У' }, { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'к', upperCase: 'К' }, { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'е', upperCase: 'Е' }, { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'н', upperCase: 'Н' }, { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'г', upperCase: 'Г' }, { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ш', upperCase: 'Ш' }, { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'щ', upperCase: 'Щ' }, { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'з', upperCase: 'З' }, { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'х', upperCase: 'Х' }, { lowerCase: '{', upperCase: '[' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ъ', upperCase: 'Ъ' }, { lowerCase: '}', upperCase: ']' } ] }
				],

				[
					{ width: 1 / 12, chars: [ { lowerCase: 'ф', upperCase: 'Ф' }, { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ы', upperCase: 'Ы' }, { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'в', upperCase: 'В' }, { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'а', upperCase: 'А' }, { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'п', upperCase: 'П' }, { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'р', upperCase: 'Р' }, { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'о', upperCase: 'О' }, { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'л', upperCase: 'Л' }, { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'д', upperCase: 'Д' }, { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ж', upperCase: 'Ж' }, { lowerCase: ':', upperCase: ';' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'э', upperCase: 'Э' }, { lowerCase: '"', upperCase: '\'' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ё', upperCase: 'Ё' }, { lowerCase: '|', upperCase: '\\' } ] }
				],

				[
					{ width: 1.5 / 12, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'я', upperCase: 'Я' }, { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ч', upperCase: 'Ч' }, { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'с', upperCase: 'С' }, { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'м', upperCase: 'М' }, { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'и', upperCase: 'И' }, { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'т', upperCase: 'Т' }, { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ь', upperCase: 'Ь' }, { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'б', upperCase: 'Б' }, { lowerCase: ',', upperCase: '' } ] },
					{ width: 1 / 12, chars: [ { lowerCase: 'ю', upperCase: 'Ю' }, { lowerCase: '.', upperCase: '' } ] },
					{ width: 1.5 / 12, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.15, command: 'switch-set', chars: [ { lowerCase: 'eng' } ] },
					{ width: 0.15, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.3, command: 'switch', chars: [ { lowerCase: 'АБВ' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	/////////////////////////////////////////////////////////

	de:
		[
			[
				[
					{ width: 1 / 11, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ü', upperCase: 'Ü' } ] }
				],

				[
					{ width: 1 / 11, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ö', upperCase: 'Ö' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ä', upperCase: 'Ä' } ] }
				],

				[
					{ width: 2 / 11, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 2 / 11, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	///////////////////////////////////////////////////////////

	es:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ñ', upperCase: 'Ñ' } ] }
				],

				[
					{ width: 0.15, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 0.15, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	//////////////////////////////////////////////////////////////////////

	el:
		[
			[
				[
					{ width: 0.1, chars: [ { lowerCase: ';', upperCase: ':' }, { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ς', upperCase: 'ς' }, { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ε', upperCase: 'Ε' }, { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ρ', upperCase: 'Ρ' }, { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'τ', upperCase: 'Τ' }, { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'υ', upperCase: 'Υ' }, { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'θ', upperCase: 'Θ' }, { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ι', upperCase: 'Ι' }, { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ο', upperCase: 'Ο' }, { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'π', upperCase: 'Π' }, { lowerCase: 'p', upperCase: 'P' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: 'α', upperCase: 'Α' }, { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'σ', upperCase: 'Σ' }, { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'δ', upperCase: 'Δ' }, { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'φ', upperCase: 'Φ' }, { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'γ', upperCase: 'Γ' }, { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'η', upperCase: 'Η' }, { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ξ', upperCase: 'Ξ' }, { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'κ', upperCase: 'Κ' }, { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'λ', upperCase: 'Λ' }, { lowerCase: 'l', upperCase: 'L' } ] }
				],

				[
					{ width: 0.15, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ζ', upperCase: 'Ζ' }, { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'χ', upperCase: 'Χ' }, { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ψ', upperCase: 'Ψ' }, { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ω', upperCase: 'Ω' }, { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'β', upperCase: 'Β' }, { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'ν', upperCase: 'Ν' }, { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 0.1, chars: [ { lowerCase: 'μ', upperCase: 'Μ' }, { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 0.15, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.15, command: 'switch-set', chars: [ { lowerCase: 'eng' } ] },
					{ width: 0.15, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		],

	////////////////////////////////////////////////////////////////////////////////

	nord:
		[
			[
				[
					{ width: 1 / 11, chars: [ { lowerCase: 'q', upperCase: 'Q' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'w', upperCase: 'W' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'e', upperCase: 'E' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'r', upperCase: 'R' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 't', upperCase: 'T' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'y', upperCase: 'Y' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'u', upperCase: 'U' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'i', upperCase: 'I' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'o', upperCase: 'O' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'p', upperCase: 'P' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'å', upperCase: 'Å' } ] }
				],

				[
					{ width: 1 / 11, chars: [ { lowerCase: 'a', upperCase: 'A' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 's', upperCase: 'S' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'd', upperCase: 'D' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'f', upperCase: 'F' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'g', upperCase: 'G' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'h', upperCase: 'H' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'j', upperCase: 'J' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'k', upperCase: 'K' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'l', upperCase: 'L' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'æ', upperCase: 'Æ' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'ø', upperCase: 'Ø' } ] }
				],

				[
					{ width: 2 / 11, command: 'shift', chars: [ { icon: 'shift' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'z', upperCase: 'Z' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'x', upperCase: 'X' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'c', upperCase: 'C' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'v', upperCase: 'V' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'b', upperCase: 'B' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'n', upperCase: 'N' } ] },
					{ width: 1 / 11, chars: [ { lowerCase: 'm', upperCase: 'M' } ] },
					{ width: 2 / 11, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]

			],

			[
				[
					{ width: 0.1, chars: [ { lowerCase: '1' } ] },
					{ width: 0.1, chars: [ { lowerCase: '2' } ] },
					{ width: 0.1, chars: [ { lowerCase: '3' } ] },
					{ width: 0.1, chars: [ { lowerCase: '4' } ] },
					{ width: 0.1, chars: [ { lowerCase: '5' } ] },
					{ width: 0.1, chars: [ { lowerCase: '6' } ] },
					{ width: 0.1, chars: [ { lowerCase: '7' } ] },
					{ width: 0.1, chars: [ { lowerCase: '8' } ] },
					{ width: 0.1, chars: [ { lowerCase: '9' } ] },
					{ width: 0.1, chars: [ { lowerCase: '0' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '@' } ] },
					{ width: 0.1, chars: [ { lowerCase: '#' } ] },
					{ width: 0.1, chars: [ { lowerCase: '|' } ] },
					{ width: 0.1, chars: [ { lowerCase: '_' } ] },
					{ width: 0.1, chars: [ { lowerCase: '&' } ] },
					{ width: 0.1, chars: [ { lowerCase: '-' } ] },
					{ width: 0.1, chars: [ { lowerCase: '+' } ] },
					{ width: 0.1, chars: [ { lowerCase: '(' } ] },
					{ width: 0.1, chars: [ { lowerCase: ')' } ] },
					{ width: 0.1, chars: [ { lowerCase: '/' } ] }
				],

				[
					{ width: 0.1, chars: [ { lowerCase: '=' } ] },
					{ width: 0.1, chars: [ { lowerCase: '*' } ] },
					{ width: 0.1, chars: [ { lowerCase: '"' } ] },
					{ width: 0.1, chars: [ { lowerCase: '\'' } ] },
					{ width: 0.1, chars: [ { lowerCase: ':' } ] },
					{ width: 0.1, chars: [ { lowerCase: ';' } ] },
					{ width: 0.1, chars: [ { lowerCase: '!' } ] },
					{ width: 0.1, chars: [ { lowerCase: '?' } ] },
					{ width: 0.2, command: 'backspace', chars: [ { icon: 'backspace' } ] }
				],

				[
					{ width: 0.2, command: 'switch', chars: [ { lowerCase: '.?12' } ] },
					{ width: 0.1, chars: [ { lowerCase: ',' } ] },
					{ width: 0.4, command: 'space', chars: [ { icon: 'space' } ] },
					{ width: 0.1, chars: [ { lowerCase: '.' } ] },
					{ width: 0.2, command: 'enter', chars: [ { icon: 'enter' } ] }
				]
			]
		]

};

//

const textureLoader = new TextureLoader();

//

/**
 * Job: high-level component that returns a keyboard
 */
class Keyboard extends mix.withBase( Object3D )( BoxComponent, MeshUIComponent ) {

	constructor( options ) {

		// DEFAULTS

		if ( !options ) options = {};
		if ( !options.width ) options.width = 1;
		if ( !options.height ) options.height = 0.4;
		if ( !options.margin ) options.margin = 0.003;
		if ( !options.padding ) options.padding = 0.01;

		//

		super( options );

		this.currentPanel = 0;

		this.isLowerCase = true;

		this.charsetCount = 1;

		//////////
		// KEYMAP
		//////////

		// ../utils/Keymaps contains information about various keyboard layouts
		// We select one depending on the user's browser language if
		// there is no options.language

		let keymap;

		if ( options.language || navigator.language ) {

			switch ( options.language || navigator.language ) {

				case 'fr' :
				case 'fr-CH' :
				case 'fr-CA' :
					keymap = keymaps.fr;
					break;

				case 'ru' :
					this.charsetCount = 2;
					keymap = keymaps.ru;
					break;

				case 'de' :
				case 'de-DE' :
				case 'de-AT' :
				case 'de-LI' :
				case 'de-CH' :
					keymap = keymaps.de;
					break;

				case 'es' :
				case 'es-419' :
				case 'es-AR' :
				case 'es-CL' :
				case 'es-CO' :
				case 'es-ES' :
				case 'es-CR' :
				case 'es-US' :
				case 'es-HN' :
				case 'es-MX' :
				case 'es-PE' :
				case 'es-UY' :
				case 'es-VE' :
					keymap = keymaps.es;
					break;

				case 'el' :
					this.charsetCount = 2;
					keymap = keymaps.el;
					break;

				case 'nord' :
					keymap = keymaps.nord;
					break;

				default :
					keymap = keymaps.eng;
					break;

			}

		} else {

			keymap = keymaps.eng;

		}

		////////////////////
		// BLOCKS CREATION
		////////////////////

		// PANELS

		this.keys = [];

		this.panels = keymap.map( ( panel ) => {

			const lineHeight = ( options.height / panel.length ) - ( options.margin * 2 );

			const panelBlock = new Block( {
				width: options.width + ( options.padding * 2 ),
				height: options.height + ( options.padding * 2 ),
				offset: 0,
				padding: options.padding,
				fontFamily: options.fontFamily,
				fontTexture: options.fontTexture,
				backgroundColor: options.backgroundColor,
				backgroundOpacity: options.backgroundOpacity
			} );

			panelBlock.charset = 0;

			panelBlock.add( ...panel.map( ( line ) => {

				const lineBlock = new Block( {
					width: options.width,
					height: lineHeight,
					margin: options.margin,
					contentDirection: 'row',
					justifyContent: 'center'
				} );

				lineBlock.frame.visible = false;

				const keys = [];

				line.forEach( ( keyItem ) => {

					const key = new Block( {
						width: ( options.width * keyItem.width ) - ( options.margin * 2 ),
						height: lineHeight,
						margin: options.margin,
						justifyContent: 'center',
						offset: 0
					} );

					const char = keyItem.chars[ panelBlock.charset ].lowerCase || keyItem.chars[ panelBlock.charset ].icon || 'undif';

					if (
						( char === 'enter' && options.enterTexture ) ||
						( char === 'shift' && options.shiftTexture ) ||
						( char === 'backspace' && options.backspaceTexture )
					) {

						const url = ( () => {

							switch ( char ) {

								case 'backspace':
									return options.backspaceTexture;
								case 'enter':
									return options.enterTexture;
								case 'shift':
									return options.shiftTexture;
								default:
									console.warn( 'There is no icon image for this key' );

							}

						} )();

						textureLoader.load( url, ( texture ) => {

							key.add(
								new InlineBlock( {
									width: key.width * 0.65,
									height: key.height * 0.65,
									backgroundSize: 'contain',
									backgroundTexture: texture
								} )
							);

						} );

					} else {

						key.add(
							new Text( {
								content: char,
								offset: 0
							} )
						);

					}

					key.type = 'Key';

					key.info = keyItem;
					key.info.input = char;
					key.panel = panelBlock;

					// line's keys
					keys.push( key );

					// keyboard's keys
					this.keys.push( key );

				} );

				lineBlock.add( ...keys );

				return lineBlock;

			} ) );

			return panelBlock;

		} );

		this.add( this.panels[ 0 ] );

		// Lastly set the options parameters to this object, which will trigger an update
		this.set( options );

	}

	/**
	 * Used to switch to an entirely different panel of this keyboard,
	 * with potentially a completely different layout
	 */
	setNextPanel() {

		this.panels.forEach( ( panel ) => {

			this.remove( panel );

		} );

		this.currentPanel = ( this.currentPanel + 1 ) % ( this.panels.length );

		this.add( this.panels[ this.currentPanel ] );

		this.update( true, true, true );

	}

	/*
	 * Used to change the keys charset. Some layout support this,
	 * like the Russian or Greek keyboard, to be able to switch to
	 * English layout when necessary
	 */
	setNextCharset() {

		this.panels[ this.currentPanel ].charset = ( this.panels[ this.currentPanel ].charset + 1 ) % this.charsetCount;

		this.keys.forEach( ( key ) => {

			// Here we sort the keys, we only keep the ones that are part of the current panel.

			const isInCurrentPanel = this.panels[ this.currentPanel ].getObjectById( key.id );

			if ( !isInCurrentPanel ) return;

			//

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			if ( !key.childrenTexts.length ) return;

			const textComponent = key.childrenTexts[0];

			key.info.input = newContent;

			textComponent.set( {
				content: newContent
			} );

			textComponent.update( true, true, true );

		} );

	}

	/** Toggle case for characters that support it. */
	toggleCase() {

		this.isLowerCase = !this.isLowerCase;

		this.keys.forEach( ( key ) => {

			const char = key.info.chars[ key.panel.charset ] || key.info.chars[ 0 ];

			const newContent = this.isLowerCase || !char.upperCase ? char.lowerCase : char.upperCase;

			if ( !key.childrenTexts.length ) return;

			const textComponent = key.childrenTexts[0];

			key.info.input = newContent;

			textComponent.set( {
				content: newContent
			} );

			textComponent.update( true, true, true );

		} );

	}

	////////////
	//  UPDATE
	////////////

	parseParams() {
	}

	updateLayout() {
	}

	updateInner() {
	}

}

/* global global */

const update = () => UpdateManager.update();

const ThreeMeshUI = {
	Block,
	Text,
	InlineBlock,
	Keyboard,
	FontLibrary,
	update,
	TextAlign,
	Whitespace,
	JustifyContent,
	AlignItems,
	ContentDirection
};

if ( typeof global !== 'undefined' ) global.ThreeMeshUI = ThreeMeshUI;

export { AlignItems, Block, ContentDirection, FontLibrary, InlineBlock, JustifyContent, Keyboard, Text, TextAlign, Whitespace, ThreeMeshUI as default, update };
//# sourceMappingURL=three-mesh-ui.esm.js.map
