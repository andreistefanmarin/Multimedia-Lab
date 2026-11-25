const canvas = document.getElementById("gamepad");
const context = canvas.getContext('2d');

const bpm = 120;
const sixteenthDuration = 60 / bpm / 4;

const bars = 2;
const noteValue = 16;
const totalRows = bars * noteValue;
const sixteenthHeight = canvas.height / totalRows;

const startTime = performance.now();
const canvasLeft = canvas.getBoundingClientRect().left;

function draw(elapsedSteps) 
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(const chord of data) 
    {
        for(const keyObject of chord.keys)
        {
            const keyDomElement = document.querySelector(`[data-key="${keyObject.key}"]`);
            const keyRect = keyDomElement.getBoundingClientRect();

            const boxWidth = keyRect.width;
            const boxHeight = keyObject.duration * sixteenthHeight;
            const boxX = keyRect.x - canvasLeft;
            const boxY = (elapsedSteps - chord.onBeat) * sixteenthHeight;

            const isBlackKey = keyDomElement.classList.contains('blackKey');

            if(keyObject.hand === 'left') 
                context.fillStyle = isBlackKey ? 'purple' : 'magenta';
            else
                context.fillStyle = isBlackKey ? 'red' : 'orange';

            context.fillRect(boxX, boxY, boxWidth, boxHeight);
        }
    }
}

function render(now) {
    const elapsedSeconds = (now - startTime) / 1000;
    const elapsedSteps = elapsedSeconds / sixteenthDuration;
    draw(elapsedSteps);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);