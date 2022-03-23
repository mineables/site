window.loadedImages = {};
window.canvas = {};
window.draw_initialized = 0;
window.rigcount = 0;

/*
function animationFrame() {
    let resolve = null
    const promise = new Promise(r => resolve = r)
    window.requestAnimationFrame(resolve)
    return promise
}
*/

async function drawImg(canvas, src, x, y, render = 0) {
    await animationFrame();
    if (typeof window.loadedImages[src] !== 'undefined') {
        canvas.drawImage(window.loadedImages[src], x, y);
    }
    if (render == 1) { 
    	generateImage(); 
    }
}

function generateImage() {
    var dataURL = window.canvas.toDataURL("image/jpeg", 0.5);
    $("#random_rig").attr('src', dataURL);
}

function drawRig(parts_array) {

	console.log('parts_array: ', parts_array)

    //rigdraw_canvas.clearRect(0, 0, canvas.width, canvas.height);
    rigdraw_canvas.fillStyle = "white";
    rigdraw_canvas.fillRect(0, 0, canvas.width, canvas.height);

    render_step = 22;
    for (let index = 0; index < 23; index++) {
        if (index == 0 || index == 4 || index == 14) {
            for (let i = 0; i < parts.length; i++) {
                if (parts[i]['id'] == parts_array[0]) {
                    if (index == 0) {
                        //let random_background = random_parts(5);
                        //addPart(23, parts[random_background]['img0']);
                        addPart(index, parts[i]['img0']);
                    } else if (index == 4) { 
                    	addPart(index, parts[i]['img1']); 
                	} else if (index == 14) { 
                		addPart(index, parts[i]['img2']); 
                	}
                }
            }
        }
        if (index == 1) {
            for (let i = 0; i < parts.length; i++) {
                if (parts[i]['id'] == parts_array[1]) { 
                	addPart(index, parts[i]['img0']); 
                }
            }
        }
        if (index == 2) {
            for (let i = 0; i < parts.length; i++) {
                if (parts[i]['id'] == parts_array[2]) { 
                	addPart(index, parts[i]['img0']); 
                }
            }
        }
        if (index >= 5 && index <= 13) {
            for (let i = 0; i < parts.length; i++) {
                if (parts[i]['id'] == parts_array[index - 2]) { 
                	addPart(index, parts[i]['img0']); 
                }
            }
        }
        if (index >= 15) {
            for (let i = 0; i < parts.length; i++) {
                if (parts[i]['id'] == parts_array[index - 12]) {
                    if (render_step == index) { 
                    	addPart(index, parts[i]['img1'], 1); 
                    } else { 
                    	addPart(index, parts[i]['img1']); 
                    }
                }
            }
        }
        if (index == render_step) { 
        	addPart(0, 0, 1); 
        }
    }
}
async function addPart(step, src, render = 0) {
    await animationFrame();
    x = 0;
    y = 50;
    if (step == 23) { 
    	y = 0; 
    }
    if (step >= 5 && step <= 13) {
        count = 12 - step;
        x += -72 * count;
        y += -42 * count;
    } else if (step >= 15 && step <= 22) {
        count = 22 - step;
        x += -72 * count;
        y += -42 * count;
    }
    if (render == 1) { 
    	drawImg(rigdraw_canvas, src, x, y, 1); 
    } else { 
    	drawImg(rigdraw_canvas, src, x, y); 
    }
}

function init() {
    canvas = document.createElement("canvas", { "id": "rig_draw2" });
    canvas.width = 1180;
    canvas.height = 1180;
    rigdraw_canvas = canvas.getContext("2d");
    var promise = new Promise(r => resolve = r);
    loadImages(function(images) {
        window.promiseArray = images.map(function(imgurl) {
            var prom = new Promise(function(resolve, reject) {
                var img = new Image();
                img.onload = function() {
                    window.loadedImages[imgurl] = img;
                    resolve();
                };
                img.src = imgurl;
            });
            return prom;
        });
        Promise.all(window.promiseArray).then(function() {
            window.draw_initialized = 1;
            draw_random_rig();
            return promise;
        });
    });
}

function loadImages(callback) {
    var images = [];
    for (let i = 0; i < parts.length; i++) {
        for (let k = 0; k < 3; k++) {
            let field = 'img' + k;
            if (typeof parts[i][field] !== 'undefined') { 
            	images.push(parts[i][field]); 
            }
        }
    }
    return callback(images);
}

async function draw_random_rig() {
    if (window.draw_initialized == 0) { 
    	await init(); 
    } else {
        window.parts_array = [random_parts(1), random_parts(2), random_parts(3), 
                              random_parts(4), random_parts(4, 50), random_parts(4), 
                              random_parts(4, 50), random_parts(4), random_parts(4, 50), 
                              random_parts(4), random_parts(4, 50)];
        drawRig(parts_array);
    }
};

function random_parts(type, chancezero = 0) {
    let possible_parts = [];
    for (let index = 0; index < parts.length; index++) {
        if (parts[index]['type'] == type) { 
        	possible_parts.push(parts[index]['id']); 
        }
    }
    if (chancezero > 0) {
        let chance = Math.floor(Math.random() * 100);
        console.log(chance);
        if (chance < chancezero)
            return 0;
    }
    return possible_parts[Math.floor(Math.random() * possible_parts.length)];
}