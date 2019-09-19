"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const tc = __importStar(require("@actions/tool-cache"));
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
// Config key values in the action.yml.
const MinikubeVersionInput = 'minikube-version';
const K8sVersionInput = 'k8s-version';
class MinikubeConfig {
    constructor(minikubeVersion, k8sVersion) {
        this.minikubeVersion = minikubeVersion;
        this.k8sVersion = k8sVersion;
    }
    // Returns the arguments to pass to `minikube start`.
    getCommand() {
        let args = ['start'];
        return args;
    }
}
exports.MinikubeConfig = MinikubeConfig;
function getMinikubeConfig() {
    const minikubeVersion = core.getInput(MinikubeVersionInput);
    const k8sVersion = core.getInput(K8sVersionInput);
    return new MinikubeConfig(minikubeVersion, k8sVersion);
}
exports.getMinikubeConfig = getMinikubeConfig;
function getDownloadUrl(version) {
    const osPlat = os.platform();
    const platform = osPlat === 'win32' ? 'windows' : osPlat;
    const suffix = osPlat === 'win32' ? '.exe' : '';
    return `https://github.com/kubernetes/minikube/releases/download/v${version}/minikube-${platform}-amd64${suffix}`;
}
exports.getDownloadUrl = getDownloadUrl;
// this action should always be run from a Linux worker
function downloadMinikube(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = getDownloadUrl(version);
        console.info('Downloading Minikube from ' + url);
        let downloadPath = null;
        downloadPath = yield tc.downloadTool(url);
        const binPath = '/home/runner/bin';
        yield io.mkdirP(binPath);
        yield exec.exec('chmod', ['+x', downloadPath]);
        yield io.mv(downloadPath, path.join(binPath, 'kind'));
        core.addPath(binPath);
    });
}
exports.downloadMinikube = downloadMinikube;
