import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vaultItemStore } from "@/stores/useVaultItemStore";
import { FilePen, Trash2 } from "lucide-react";
import { VaultItems } from "@/interfaces/vault";

interface Props {
  editItem: (item: VaultItems) => void;
}

export default function TableComponent(props: Props) {
  const { editItem } = props;
  const vaultItems = vaultItemStore((s) => s.vaultItems);

  const head: string[] = ["Descrição", "Link", "Senha", "Ações"];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {head.map((title) => (
              <TableHead
                key={title}
                className="text-white text-[16px] font-bold"
              >
                {title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaultItems?.map((vault, i: number) => (
            <TableRow key={i}>
              <TableCell>{vault.description}</TableCell>
              <TableCell>{vault.url}</TableCell>
              <TableCell>{vault.encryptedValue}</TableCell>
              <TableCell className="flex gap-2">
                <FilePen
                  size={20}
                  onClick={() => editItem(vault)}
                  className="text-primary cursor-pointer hover:brightness-125 transition-brightness"
                />{" "}
                <Trash2
                  size={20}
                  className="text-red-300 cursor-pointer hover:saturate-200 transition-saturate"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
