import React, { useEffect, useState, useRef, FC } from 'react';
import { Tooltip } from 'antd';

const EllipsisText: FC<{
  className?: string;
  text?: any;
  tooltipClassName?: string;
  alwaysShowTooltip?: boolean;
  maxWidth?: number;
  tooltipText?: string;
}> = ({ className, text, tooltipClassName, alwaysShowTooltip, maxWidth, tooltipText }) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const dataRef = useRef<any>();

  useEffect(() => {
    if (maxWidth) {
      setIsOverflow(
        dataRef.current.scrollWidth > dataRef.current.clientWidth || dataRef.current.scrollWidth > maxWidth,
      );
    } else {
      setIsOverflow(dataRef.current.scrollWidth > dataRef.current.clientWidth);
    }
  }, [text, maxWidth]);

  return isOverflow || alwaysShowTooltip ? (
    <Tooltip title={tooltipText || text} overlayClassName={tooltipClassName ? tooltipClassName : 'tooltip-detail'}>
      <div
        ref={dataRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        className={className}
      >
        {text}
      </div>
    </Tooltip>
  ) : (
    <div
      ref={dataRef}
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      className={className}
    >
      {text}
    </div>
  );
};

export default EllipsisText;
