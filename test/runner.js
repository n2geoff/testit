import spec from "./index.spec.js";

spec.run(false, (r) => {
    let errors = [];

    document.body.style.backgroundColor = (
        r.fail.length ? "#ff9999" : "#99ff99"
    );

    r.pass.forEach((p) => errors.push(`<br>${p}`));
    r.fail.forEach((f) => errors.push(`<br><b>${f}</b>`));

    document.querySelector("#errors").innerHTML = errors;
    document.querySelector("#summary").innerHTML = `| tests: ${r.pass.length + r.fail.length} | pass: ${r.pass.length} | fail: ${r.fail.length} |`;
});
