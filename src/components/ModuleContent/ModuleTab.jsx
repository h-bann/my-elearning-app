import React from "react";
import { greenTick, downArrow } from "../../utils/svgs";

const ModuleTab = ({
  onModuleClick,
  module,
  moduleProgress,
  activeModule,
  isHidden,
}) => {
  return (
    <div className="module-tab" onClick={() => onModuleClick(module)}>
      <h1>{module.module_title}</h1>
      <div className="module-tab-svg">
        <div key={module.id}>
          {moduleProgress?.map((moduleId) => {
            if (moduleId === module.id) {
              return <span key={moduleId}>{greenTick}</span>;
            }
          })}
        </div>
        <div
          className={`svg-container ${activeModule === module.id && "rotated"}`}
        >
          {downArrow}
        </div>
      </div>
    </div>
  );
};

export default ModuleTab;
