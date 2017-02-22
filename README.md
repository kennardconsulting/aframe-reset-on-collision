# A-Frame: reset-on-collision

## What Is It?

Resets an `a-entity` position to the 'last known good' position after any simple AABB collision.
Will only work for axis-aligned entities (such as simple walls).

## What's It Good For?

If attached to a `camera`, will prevent walking through walls using WASD controls and/or physically
moving in a room-scale environment. For the latter, the world will appear to 'push back' against the
user.

## What Isn't It Good For?

Collision detection uses simple (but fast) AABB collision detection. So will only work for simple axis
aligned primitives (such as `a-plane` or `a-box` used as walls). Also the positional reset is a
bit janky, and it doesn't implement 'wall sliding' when using WASD controls.

## Who Should Use It?

Anyone looking for a quick and dirty solution to stopping people walking through walls in environments
where they shouldn't really be going anywhere near the walls in the first place. For example, it's not
good for a First Person Shooter where people try to hug the walls (because it doesn't implement 'wall
sliding'). But it's fine for an [art gallery viewing application](http://blog.kennardconsulting.com/2017/02/virtual-reality-art-show.html).

## How Do I Use It?

Add to an `a-entity`. For example:

    <a-entity camera reset-on-collision="wall: .wall"/>
