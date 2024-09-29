import React, { useState, useEffect } from "react";

import { GreenTick, DownArrow } from "../../utils/svgs";

const ModuleTab = ({ onModuleClick, module, moduleProgress, activeModule }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  if (innerWidth < 360) {
    return (
      <div className="module-tab" onClick={() => onModuleClick(module)}>
        <h1>{module.module_title}</h1>
        <div className="module-tab-svg">
          <div key={module.id}>
            {moduleProgress?.map((moduleId) => {
              if (moduleId === module.id) {
                return (
                  <GreenTick
                    key={moduleId}
                    className="module-complete-symbol"
                  />
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
  }

  return (
    <div
      className={`module-tab-desktop ${
        activeModule === module.id ? "active" : ""
      }`}
      onClick={() => onModuleClick(module)}
    >
      <h4>{module.module_title}</h4>
      <div className="module-tab-svg">
        {moduleProgress?.map((moduleId) => {
          if (moduleId === module.id) {
            return (
              <GreenTick key={moduleId} className="module-complete-symbol" />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ModuleTab;
