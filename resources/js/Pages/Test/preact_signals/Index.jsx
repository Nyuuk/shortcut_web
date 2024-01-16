import { computed, effect } from "@preact/signals-react";
import Layout, { LayoutComponent } from "./Layout";
import { testSignal } from "./signal";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import { useEffect, useState } from "react";

export default function Index() {
    console.log("Rendering Index");
    return (
        <>
            <Inti />
        </>
    );
}

function WithComputed() {
    console.log("Rendering WithComputed");
    return computed(() => {
        return (
            <LayoutComponent>
                <h1 className="text-2xl">With Computed</h1>
                <h1 className="text-xl">Data Signal : {testSignal.value}</h1>
                <span className="text-sm">
                    using <span className="text-red-500">.value</span> and{" "}
                    <span className="text-red-500">computed function</span> will
                    make it update automatically without rendered again
                </span>
            </LayoutComponent>
        );
    });
}

function WithoutComputed() {
    return (
        <LayoutComponent>
            <h1 className="text-2xl">Without Computed</h1>
            <h1 className="text-xl">Data Signal : {testSignal.value}</h1>
            <span className="text-sm">
                using <span className="text-red-500">.value</span> will not
                rendered again
            </span>
        </LayoutComponent>
    );
}

function Inti() {
    console.log("rendering WithoutState");
    return (
        <Layout text="Without state">
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-xl">Data Signal : {testSignal}</h1>
                <span className="text-sm">
                    without <span className="text-red-500">.value</span> will
                    make it update automaticaly without rendered again
                </span>
            </div>
            <div className="flex flex-row justify-center gap-2">
                <ComponentA />
                <ComponentB />
            </div>
            <WithoutComputed />
            <WithComputed />
            <WithState />
        </Layout>
    );
}

function WithState() {
    const [anu, setAnu] = useState();
    useEffect(() => {
        setAnu(testSignal);
    }, [testSignal]);

    console.log("Rendering [WithState]");
    return (
        <LayoutComponent>
            <h1 className="text-2xl">With State</h1>
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-xl">Data Signal : {anu}</h1>
                {/* <span className="text-sm">
                    without <span className="text-red-500">.value</span> will
                    make it update automaticaly without rendered again
                </span> */}
            </div>
        </LayoutComponent>
    );
}
