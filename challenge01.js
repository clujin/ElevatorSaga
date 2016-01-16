{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            // let's go to all the floors (or did we forget one?)
            var length = elevator.getPressedFloors.length();
            if (length > 0) {
                elevator.goToFloor(elevator.getPressedFloors[length-1]);
            }
        });
        
        elevator.on("floor_button_pressed", function(floorNum) {
            elevator.destinationQueue.push(floors[floorNum]);
        });
        
        elevator.on("passing_floor", function(floorNum, direction){
            if (elevator.destinationDirection() === direction) {
                elevator.goToFloor(floorNum, true);
            }
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
