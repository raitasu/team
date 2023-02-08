import { useRef } from 'react';

import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text
} from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import {
  type EmployeeProject,
  type ShortEmployee
} from '~/store/api/employees/employees.types';

const DEFAULT_FONT_HEIGHT = 19;
const COUNT_LINE = 2;

export const ProjectsCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['projects']>) => {
  const [t] = useTranslation();
  const projects = getValue();
  const lastProject = projects?.at(-1);
  const divRef = useRef<HTMLDivElement>(null);

  const divRefHeight =
    divRef.current !== null ? divRef.current.clientHeight : 0;

  const isShowedPoppover = divRefHeight >= DEFAULT_FONT_HEIGHT * COUNT_LINE;

  const getProject = (project: EmployeeProject) => (
    <Link
      key={project.id}
      to={`${PagePaths.Projects}/${project.id}`}
      target="_blank"
      style={{
        display: `${isShowedPoppover ? 'block' : 'inline'}`,
        lineHeight: `${DEFAULT_FONT_HEIGHT}px`
      }}
    >
      {`${project.name}${lastProject?.id !== project.id ? '; ' : ''} `}
    </Link>
  );

  return (
    <div
      ref={divRef}
      style={{
        display: '-webkit-box',
        maxHeight: '38px',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        MozBoxOrient: 'vertical'
      }}
    >
      {projects && projects.length ? (
        projects.map((project: EmployeeProject) =>
          isShowedPoppover ? (
            <Popover
              key={project.id}
              trigger="hover"
            >
              <PopoverTrigger>{getProject(project)}</PopoverTrigger>
              <PopoverContent
                color="brand.body"
                width="max-content"
              >
                <PopoverArrow bg="brand.stroke" />
                <PopoverBody bg="brand.white">
                  {projects.map((item: EmployeeProject) => getProject(item))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            getProject(project)
          )
        )
      ) : (
        <Text color="brand.lightGray">
          {t('domains:projects.errors.no_projects')}
        </Text>
      )}
    </div>
  );
};
