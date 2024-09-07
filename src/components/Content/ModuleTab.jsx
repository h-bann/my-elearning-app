import React from "react";
import { GreenTick, DownArrow } from "../../utils/svgs";

const ModuleTab = ({ onModuleClick, module, moduleProgress, activeModule }) => {
  return (
    <div className="module-tab" onClick={() => onModuleClick(module)}>
      <h1>{module.module_title}</h1>
      <div className="module-tab-svg">
        <div key={module.id}>
          {moduleProgress?.map((moduleId) => {
            if (moduleId === module.id) {
              return (
                <span key={moduleId}>
                  <GreenTick className="module-complete-symbol" />
                </span>
              );
            }
          })}
        </div>
        <div
          className={`arrow ${
            activeModule === module.id ? "rotated-left" : null
          }`}
        >
          <DownArrow />
        </div>
      </div>
    </div>
  );
};

export default ModuleTab;
