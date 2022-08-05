import { ScenarioNode } from "./interfaces/ScenarioNode.interface";

class CallScenario {
  private _start_step;
  private _steps;

  constructor(start_step: string, steps: ScenarioNode[]) {
    this._start_step = start_step;
    this._steps = steps;
  }
  get start_step() {
    return this._start_step;
  }

  get steps() {
    return this._steps;
  }

  set steps(value: ScenarioNode[]) {
    this._steps = value;
  }

  getStepById(id: string): ScenarioNode | null {
    const index = this.steps.findIndex((node) => node.id === id);
    return this.steps[index] || null;
  }

  getPreviousStep(id: string): ScenarioNode | null {
    const index = this.steps.findIndex((node) => node.ref === id);
    return this.steps[index] ;
  }

  getNextStep(id: string): ScenarioNode | null {
    const currNode = this.getStepById(id);
    return this.getStepById(currNode.ref);
  }

  getStepsList() {
    const getResponseArr = (
      response_arr: string[],
      next_step: ScenarioNode
    ) => {
      if (next_step) {
        const transfer_arr = response_arr;
        transfer_arr.push(next_step.id);
        getResponseArr(transfer_arr, this.getStepById(next_step.ref));
      }
      return response_arr;
    };
    const res = getResponseArr(
      [this.start_step],
      this.getNextStep(this.start_step)
    );
    return res;
  }

  nodeHasAudio(id: string): boolean {
    const step = this.getStepById(id);
    let res: boolean = false;

    if (step.options?.audio?.url) res = !res;

    return res;
  }
}

const call = new CallScenario("8e9893a6-6930-476e-80d6-cf68a731044a", [
  {
    id: "8e9893a6-6930-476e-80d6-cf68a731044a",
    title: "Outbound call",
    kind: "outbound_call",
    options: null,
    ref: "a266540c-5052-4bb5-8ee6-eb455bd1111",
  },
  {
    id: "a266540c-5052-4bb5-8ee6-eb455bd1111",
    title: "Play audio",
    kind: "play_audio",
    options: {
      audio: {
        url: "https://company.org/play/audio.mp3",
      },
    },
    ref: "810893a6-6930-476e-80d6-cf68a731044a",
  },
  {
    id: "810893a6-6930-476e-80d6-cf68a731044a",
    title: "Collect input",
    kind: "collect_input",
    options: null,
    ref: "810893a6-6930-476e-70d6-cf68a731044a",
  },
  {
    id: "810893a6-6930-476e-70d6-cf68a731044a",
    title: "Scenario End",
    kind: "scenario_end",
    options: null,
    ref: null,
  },
]);

// 1
const test_1 = call.getStepById("8e9893a6-6930-476e-80d6-cf68a731044a");
console.log(test_1);

// 2
const test_2 = call.getNextStep("8e9893a6-6930-476e-80d6-cf68a731044a");
console.log(test_2);

// 3
const test_3 = call.getPreviousStep("8e9893a6-6930-476e-80d6-cf68a731044a");
console.log(test_3);

// 4
const test_4 = call.getStepsList();
console.log(test_4);

// 5
const test_5 = call.nodeHasAudio("810893a6-6930-476e-70d6-cf68a731044a");
console.log(test_5);
