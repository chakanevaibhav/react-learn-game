export type Difficulty = 'easy' | 'medium' | 'hard';

export type Level = {
  id: number;
  difficulty: Difficulty;
  title: string;
  description: string;
  instructions: string;
  initialCodePre: string;
  initialCodePost: string;
  expectedInput: string | RegExp;
  visualData: { 
    type: string;
    overlay?: string;
  };
};

export const levels: Level[] = [
  // EASY (1-10)
  {
    id: 1, difficulty: 'easy', title: "Assembly Basics: JSX", description: "Welcome to the Assembly Line. Your first task is to bring the basic chassis online.", instructions: "React components look a lot like HTML tags. Close the `<Chassis>` tag.", initialCodePre: "<Chassis ", initialCodePost: "", expectedInput: "/>", visualData: { type: 'chassis' }
  },
  {
    id: 2, difficulty: 'easy', title: "Customization: Props", description: "The chassis is looking dull. Let's give it a paint job.", instructions: "Add the `color` prop and set it to `\"neon-cyan\"`.", initialCodePre: "<Chassis ", initialCodePost: " />", expectedInput: 'color="neon-cyan"', visualData: { type: 'torso' }
  },
  {
    id: 3, difficulty: 'easy', title: "Power Up: State", description: "The robot needs an internal power core.", instructions: "Use the `useState` hook to initialize `powerLevel` to `100`.", initialCodePre: "const [power, setPower] = useState(", initialCodePost: ");", expectedInput: "100", visualData: { type: 'power-core' }
  },
  {
    id: 4, difficulty: 'easy', title: "Logic Circuits: Conditional Rendering", description: "Only attach the laser cannon if armed.", instructions: "Use the logical AND operator `&&` to render `<LaserCannon />`.", initialCodePre: "{isArmed ", initialCodePost: " <LaserCannon />}", expectedInput: "&&", visualData: { type: 'leg-l', overlay: 'laser' }
  },
  {
    id: 5, difficulty: 'easy', title: "Mass Production: Lists", description: "We need multiple thrusters.", instructions: "Use `.map()` and provide `id` as the `key` prop.", initialCodePre: "thrusters.map(t => <Thruster key={", initialCodePost: "} />)", expectedInput: "t.id", visualData: { type: 'leg-r' }
  },
  {
    id: 6, difficulty: 'easy', title: "Manual Override: Events", description: "Navigation is offline. We need a manual override switch.", instructions: "Attach an `onClick` event to trigger `initiateOverride`.", initialCodePre: "<Button ", initialCodePost: "={initiateOverride} />", expectedInput: "onClick", visualData: { type: 'foot-l', overlay: 'button' }
  },
  {
    id: 7, difficulty: 'easy', title: "Boot Sequence: useEffect", description: "Systems must be initialized precisely once.", instructions: "Provide an empty dependency array `[]` to `useEffect`.", initialCodePre: "useEffect(() => { boot(); }, ", initialCodePost: ");", expectedInput: "[]", visualData: { type: 'foot-r' }
  },
  {
    id: 8, difficulty: 'easy', title: "Cargo Bay: Children", description: "Transport sensitive materials inside the cargo bay.", instructions: "Use `props.children` to render nested components.", initialCodePre: "<div className=\"bay\">{", initialCodePost: "}</div>", expectedInput: "props.children", visualData: { type: 'neck' }
  },
  {
    id: 9, difficulty: 'easy', title: "Armor Plating: Styling", description: "Apply the heavy armor CSS class.", instructions: "In React, we use `className` instead of `class`.", initialCodePre: "<div ", initialCodePost: '="heavy-armor" />', expectedInput: "className", visualData: { type: 'head' }
  },
  {
    id: 10, difficulty: 'easy', title: "Comms Antenna: Fragments", description: "We need to return multiple nodes without adding extra DOM wrapper elements.", instructions: "Use a React Fragment to wrap the nodes.", initialCodePre: "return ( <React.", initialCodePost: "> <NodeA/> <NodeB/> </React.Fragment> )", expectedInput: "Fragment", visualData: { type: 'visor' }
  },

  // MEDIUM (11-20)
  {
    id: 11, difficulty: 'medium', title: "Optical Sensor: useRef", description: "We need direct access to the DOM to focus the optical sensor.", instructions: "Initialize a reference using `useRef(null)`.", initialCodePre: "const sensorRef = ", initialCodePost: "(null);", expectedInput: "useRef", visualData: { type: 'shoulder-l', overlay: 'scanner' }
  },
  {
    id: 12, difficulty: 'medium', title: "Network Uplink: Context", description: "Sync directives with the Mothership using global state.", instructions: "Use the `useContext` hook to read `NetworkContext`.", initialCodePre: "const network = ", initialCodePost: "(NetworkContext);", expectedInput: "useContext", visualData: { type: 'shoulder-r', overlay: 'uplink' }
  },
  {
    id: 13, difficulty: 'medium', title: "AI Core: useReducer", description: "Complex combat logic requires state reduction.", instructions: "Extract state and dispatch from `useReducer`.", initialCodePre: "const [state, ", initialCodePost: "] = useReducer(reducer, init);", expectedInput: "dispatch", visualData: { type: 'arm-l' }
  },
  {
    id: 14, difficulty: 'medium', title: "Heat Sink: Effect Cleanup", description: "Prevent memory leaks by powering down systems on unmount.", instructions: "Return an arrow function from your `useEffect` to trigger cleanup.", initialCodePre: "useEffect(() => { return () ", initialCodePost: " powerDown(); });", expectedInput: "=>", visualData: { type: 'arm-r' }
  },
  {
    id: 15, difficulty: 'medium', title: "Sync Module: Custom Hooks", description: "Share the syncing logic across multiple robot classes.", instructions: "Create a custom hook named `useRobotSync`.", initialCodePre: "function ", initialCodePost: "() { const [synced] = useState(false); return synced; }", expectedInput: "useRobotSync", visualData: { type: 'forearm-l' }
  },
  {
    id: 16, difficulty: 'medium', title: "Data Cache: useMemo", description: "Calculating warp routes is expensive. Cache the result.", instructions: "Wrap the expensive calculation in `useMemo`.", initialCodePre: "const route = ", initialCodePost: "(() => calc(a,b), [a,b]);", expectedInput: "useMemo", visualData: { type: 'forearm-r' }
  },
  {
    id: 17, difficulty: 'medium', title: "Motor Controller: useCallback", description: "Prevent unnecessary re-renders of the thruster array.", instructions: "Wrap the firing function in `useCallback`.", initialCodePre: "const fire = ", initialCodePost: "(() => setThrust(100), []);", expectedInput: "useCallback", visualData: { type: 'hand-l' }
  },
  {
    id: 18, difficulty: 'medium', title: "Companion Drone: Portals", description: "Render the drone outside the main DOM hierarchy.", instructions: "Use `createPortal` to render into `document.body`.", initialCodePre: "return ReactDOM.", initialCodePost: "(<Drone />, document.body);", expectedInput: "createPortal", visualData: { type: 'hand-r', overlay: 'drone' }
  },
  {
    id: 19, difficulty: 'medium', title: "Targeting System: forwardRef", description: "Pass the ref down to the child weapons system.", instructions: "Wrap the component in `forwardRef`.", initialCodePre: "const Weapons = ", initialCodePost: "((props, ref) => <div ref={ref} />);", expectedInput: "forwardRef", visualData: { type: 'armor-plates', overlay: 'targeting' }
  },
  {
    id: 20, difficulty: 'medium', title: "Backup Battery: Defaults", description: "Provide default props if the primary power source is undefined.", instructions: "Use destructuring assignment to set a default `power = 100`.", initialCodePre: "function Battery({ power = ", initialCodePost: " }) { return <div/>; }", expectedInput: "100", visualData: { type: 'visor-glow' }
  },

  // HARD (21-25)
  {
    id: 21, difficulty: 'hard', title: "Shield Generator: React.memo", description: "The shield must not flicker unless its frequency props change.", instructions: "Wrap the component in `React.memo` to optimize rendering.", initialCodePre: "export const Shield = React.", initialCodePost: "(({ freq }) => <div/>);", expectedInput: "memo", visualData: { type: 'shield' }
  },
  {
    id: 22, difficulty: 'hard', title: "Hyperdrive: useTransition", description: "Keep the UI responsive while calculating hyperspace jumps.", instructions: "Extract `isPending` and `startTransition` from `useTransition`.", initialCodePre: "const [isPending, ", initialCodePost: "] = useTransition();", expectedInput: "startTransition", visualData: { type: 'hyperdrive' }
  },
  {
    id: 23, difficulty: 'hard', title: "Quantum CPU: useDeferredValue", description: "Defer updating the heavy visualization tree.", instructions: "Use `useDeferredValue` to get a deferred version of `data`.", initialCodePre: "const deferredData = ", initialCodePost: "(data);", expectedInput: "useDeferredValue", visualData: { type: 'quantum' }
  },
  {
    id: 24, difficulty: 'hard', title: "Failsafe: Error Boundaries", description: "Catch catastrophic failures in child systems.", instructions: "In a class component, implement `static getDerivedStateFromError`.", initialCodePre: "static ", initialCodePost: "(error) { return { hasError: true }; }", expectedInput: "getDerivedStateFromError", visualData: { type: 'failsafe' }
  },
  {
    id: 25, difficulty: 'hard', title: "Stasis Pod: Suspense", description: "Display a loading indicator while the stasis pod code-splits dynamically.", instructions: "Wrap the lazy component in `<Suspense fallback={<Loading/>}>`.", initialCodePre: "<", initialCodePost: " fallback={<Loading/>}> <Stasis /> </_>", expectedInput: "Suspense", visualData: { type: 'ascension' }
  }
];
