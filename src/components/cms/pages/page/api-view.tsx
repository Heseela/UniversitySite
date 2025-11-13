"use client";

import JsonView from '@uiw/react-json-view';
import { TPageDto } from '@/schemas/page.schema';
import { lightTheme } from '@uiw/react-json-view/light';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { useTheme } from 'next-themes';

type Props = {
    page: TPageDto
}

export default function PageApiView({ page }: Props) {
    const { theme } = useTheme();

    return (
        <JsonView className='p-6' value={page} style={theme === "light" ? lightTheme : vscodeTheme} />
    )
}